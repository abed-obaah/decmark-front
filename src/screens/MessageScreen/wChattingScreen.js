import React, { useState, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import PageHeader from '@src/components/PageHeader';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

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

const ChatApp = () => {
  const route = useRoute();
  const { id, price, user_id, descriptions, type, providerType, names } = route.params;
  const { userInfo } = useSelector((state) => state.auth);
  const senderId = userInfo?.data?.id;
  const senderName = userInfo?.data?.first_name;

  const [chatRoomId, setChatRoomId] = useState('');
  const [messages, setMessages] = useState([]);
  const user1 = {
    _id: user_id,
    name: names,
  };

  const user2 = {
    _id: senderId,
    name: senderName,
  };

  useEffect(() => {
     const querySnapshot = firestore().collection("chatRooms").doc("4O8ooorlElzemMmBCmkz").co;;ection
    getOrCreateChatRoom();
  }, []);

  const getOrCreateChatRoom = () => {
    const users = [user1._id, user2._id];

    // Check if a chat room with these users already exists
    db.collection('chatRooms')
      .where('users', '==', users)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Chat room already exists, get its ID
          querySnapshot.forEach((doc) => {
            setChatRoomId(doc.id);
            listenForMessages(doc.id); // Listen for messages in the existing chat room
          });
        } else {
          // Chat room does not exist, create a new one
          db.collection('chatRooms')
            .add({
              users,
            })
            .then((docRef) => {
              setChatRoomId(docRef.id);
              listenForMessages(docRef.id); // Listen for messages in the newly created chat room
            });
        }
      })
      .catch((error) => {
        console.error('Error checking or creating chat room:', error);
      });
  };

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    if (chatRoomId) {
      newMessages.forEach((message) => {
        db.collection('chatRooms')
          .doc(chatRoomId)
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

  const listenForMessages = (roomId) => {
    if (roomId) {
      db.collection('chatRooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          const newMessages = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            newMessages.push({
              _id: doc.id,
              text: data.text,
              user: {
                _id: data.user,
                name: data.user === user1._id ? user1.name : user2.name,
              },
              createdAt: data.createdAt.toDate(),
            });
          });
          setMessages(newMessages);
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title={names} />
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={user1}
      />
      {Platform.OS === 'android' && (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} />
      )}
    </View>
  );
};

export default ChatApp;
