import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';
import { Audio } from 'expo-av';
import { v4 as uuidv4 } from 'uuid';

// Initialize Firebase
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
const storage = firebase.storage();

const NewMessage = () => {
  const [messages, setMessages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [audioRecording, setAudioRecording] = useState(null);
  const route = useRoute();
  const { id, price, user_id, descriptions, type, providerType, names } = route.params;

  const { userInfo } = useSelector((state) => state.auth);
  const senderId = userInfo?.data?.id;
  const senderName = userInfo?.data?.first_name;
  const myId = senderId;

  useEffect(() => {
    const querySnapshot = db
      .collection('chats')
      .doc('123456789')
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const allMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt ? data.createdAt.toDate() : null;
          return {
            ...data,
            createdAt,
          };
        });
        setMessages(allMessages);
      });

    // Clean up the listener when the component unmounts
    return () => {
      querySnapshot();
    };
  }, []);

  const onSend = (messages) => {
    let myMsg = null;
    if (imageUrl) {
      const msg = messages[0];
      myMsg = {
        ...msg,
        user: {
          _id: myId,
        },
        receiverId: user_id,
        image: imageUrl,
      };
    } else {
      const msg = messages[0];
      myMsg = {
        ...msg,
        user: {
          _id: myId,
        },
        receiverId: user_id,
      };
    }

    if (audioRecording) {
      myMsg.audio = audioRecording.uri; // Add the audio recording URI to the message
      setAudioRecording(null); // Clear the audio recording
    }

    setMessages((previousMessages) => GiftedChat.append(previousMessages, myMsg));
    db.collection('chats')
      .doc('123456789')
      .collection('messages')
      .add({
        ...myMsg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setImageUrl(null);
    setImageData(null);
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setImageData(result);
      uploadImage(result);
    }
  };

  const handleAudioRecording = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      console.error('Audio recording permission denied');
      return;
    }
  
    if (!audioRecording) {
      const recording = new Audio.Recording();
      try {
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync();
        setAudioRecording(recording);
      } catch (error) {
        console.error('Error starting audio recording:', error);
      }
    } else {
      try {
        if (audioRecording.isDoneRecording) {
          console.error('Audio recording has already been unloaded.');
        } else {
          await audioRecording.stopAndUnloadAsync();
          const audioFileUri = audioRecording.getURI(); // Get the URI of the recorded audio
          uploadAudio(audioFileUri); // Upload the audio to Firebase storage
        }
      } catch (error) {
        console.error('Error stopping audio recording:', error);
      } finally {
        setAudioRecording(null);
      }
    }
  };

  const uploadAudio = async (audioFileUri) => {
    const reference = storage.ref().child(`audio/${uuidv4()}.wav`);
  
    try {
      const response = await fetch(audioFileUri);
      const blob = await response.blob();
  
      await reference.put(blob);
      const audioUrl = await reference.getDownloadURL();
      sendAudioMessage(audioUrl);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };
  
  const sendAudioMessage = (audioUrl) => {
    // Generate a unique ID for the message
    const messageId = uuidv4();
  
    // Create a new audio message object
    const audioMessage = {
      _id: messageId,
      text: '', // You can include a text description if needed
      createdAt: new Date(), // Set the timestamp of the message
      user: {
        _id: myId,
        name: senderName,
      },
      audio: audioUrl, // Include the audio URL
    };
  
    // Append the audio message to the chat
    setMessages((previousMessages) => GiftedChat.append(previousMessages, audioMessage));
    
    // Save the audio message in Firebase or your desired storage
    db.collection('chats')
      .doc('123456789')
      .collection('messages')
      .add({
        ...audioMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  const uploadImage = async (imageData) => {
    const reference = storage.ref().child(`images/${imageData.assets[0].fileName}`);
    const pathToFile = imageData.assets[0].uri;

    const response = await fetch(pathToFile);
    const blob = await response.blob();

    try {
      await reference.put(blob);
      const url = await reference.getDownloadURL();
      setImageUrl(url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  const AudioMessage = (props) => {
    const { currentMessage } = props;
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    const playAudio = async () => {
      const { audio } = currentMessage;
      if (audio && !isPlaying) {
        const { sound: audioSound } = await Audio.Sound.createAsync({ uri: audio });
        setSound(audioSound);
        await audioSound.playAsync();
        setIsPlaying(true);
      }
    };
  
    const stopAudio = async () => {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }
    };
  
    return (
      <View style={{ padding: 8, borderRadius: 10, backgroundColor: 'lightgray' }}>
        <TouchableOpacity onPress={isPlaying ? stopAudio : playAudio}>
          <Text>{isPlaying ? 'Stop' : 'Play'}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <GiftedChat
        alwaysShowSend
        renderSend={(props) => {
          return (
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
              {imageUrl ? (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    marginRight: 10,
                  }}
                >
                  <Image
                    source={{ uri: imageData.assets[0].uri }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      position: 'absolute',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setImageUrl(null);
                    }}
                  >
                    <Image
                      source={require('../../assets/images/binance.png')}
                      style={{ width: 16, height: 16, tintColor: '#fff' }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => {
                  openCamera();
                }}
              >
                <Image
                  source={require('../../assets/images/paper.png')}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={handleAudioRecording}
              >
                <Image
                  source={
                    audioRecording
                      ? require('../../assets/images/stop.png')
                      : require('../../assets/images/mic.png')
                  }
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
              <Send {...props} containerStyle={{ justifyContent: 'center' }}>
                <Image
                  source={require('../../assets/images/sendy.png')}
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 10,
                    tintColor: 'orange',
                  }}
                />
              </Send>
            </View>
          );
        }}
        messages={messages}
        onSend={onSend}
        user={{
          _id: myId,
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: 'orange',
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default NewMessage;
