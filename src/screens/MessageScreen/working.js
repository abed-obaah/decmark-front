import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import 'firebase/firestore';
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-mmloB1dCElgNfGWAQCgQ-IjHnx1Q-5g",
  authDomain: "decmark-app.firebaseapp.com",
  projectId: "decmark-app",
  storageBucket: "decmark-app.appspot.com",
  messagingSenderId: "588375045897",
  appId: "1:588375045897:web:458b1e854cc6e874af85d8",
  measurementId: "G-GCBNP075Z5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

class ChatApp extends Component {
  state = {
    user1: {
      _id: 1,
      name: 'User 1',
    },
    user2: {
      _id: 2,
      name: 'User 2',
    },
    chatRoomId: '',
    messages: [],
  };

  componentDidMount() {
    this.getOrCreateChatRoom();
    this.listenForMessages();
  }

  getOrCreateChatRoom = () => {
    const users = [this.state.user1._id, this.state.user2._id];

    // Check if a chat room with these users already exists
    db.collection('chatRooms')
      .where('users', '==', users)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Chat room already exists, get its ID
          querySnapshot.forEach((doc) => {
            this.setState({ chatRoomId: doc.id });
          });
        } else {
          // Chat room does not exist, create a new one
          db.collection('chatRooms')
            .add({
              users,
            })
            .then((docRef) => {
              this.setState({ chatRoomId: docRef.id });
            });
        }
      })
      .catch((error) => {
        console.error('Error checking or creating chat room:', error);
      });
  };

  onSend = (messages = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  
    if (this.state.chatRoomId) {
      messages.forEach((message) => {
        db.collection('chatRooms')
          .doc(this.state.chatRoomId)
          .collection('messages')
          .add({
            text: message.text,
            user: message.user._id,
            createdAt: new Date(),
          });
      });
    } else {
      console.error('Chat room ID is missing. Chat room may not have been created yet.');
    }
  };

  listenForMessages = () => {
    if (this.state.chatRoomId) {
      db.collection('chatRooms')
        .doc(this.state.chatRoomId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          const messages = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            messages.push({
              _id: doc.id,
              text: data.text,
              user: {
                _id: data.user,
                name: data.user === this.state.user1._id ? this.state.user1.name : this.state.user2.name,
              },
              createdAt: data.createdAt,
            });
          });
          this.setState({ messages });
        });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user1}
        />
        {Platform.OS === 'android' && (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} />
        )}
      </View>
    );
  }
}

export default ChatApp;
