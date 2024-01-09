import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query, orderBy 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CustomImagePicker from './CustomImagePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';



const firebaseConfig = {
  apiKey: 'AIzaSyB-mmloB1dCElgNfGWAQCgQ-IjHnx1Q-5g',
  authDomain: 'decmark-app.firebaseapp.com',
  projectId: 'decmark-app',
  storageBucket: 'decmark-app.appspot.com',
  messagingSenderId: '588375045897',
  appId: '1:588375045897:web:458b1e854cc6e874af85d8',
  measurementId: 'G-GCBNP075Z5',
};

initializeApp(firebaseConfig);

const storage = getStorage();

const NewMessage = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const { id, price, user_id, descriptions, type, providerType, names } = route.params;
  const { userInfo } = useSelector((state) => state.auth);
  const senderId = userInfo?.data?.id;
  const userId = user_id;
  const senderName = userInfo?.data?.first_name;
  const myId = senderId;

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(
        collection(db, 'chats', senderId + userId, 'messages'),
        // Remove orderBy to get messages in ascending order by default
        orderBy("createdAt", 'desc')
      );
      const allMessages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt && data.createdAt.toDate && typeof data.createdAt.toDate === 'function'
          ? data.createdAt.toDate()
          : new Date(); // Use a valid timestamp or the current date as a fallback
        return {
          _id: doc.id,
          text: data.text,
          createdAt,
          user: {
            _id: data.sendBy,
            name: senderName,
          },
          image: data.image || null,
        };
      });
      setMessages(allMessages); // Reverse the messages to show in ascending order
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    // Function to store userId in AsyncStorage
    const storeUserIdInSession = async () => {
      try {
        const expirationTime = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        const currentTime = new Date().getTime();
        const expirationDate = currentTime + expirationTime;

        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('senderId', senderId);
        await AsyncStorage.setItem('userIdExpiration', expirationDate.toString());
      } catch (error) {
        console.error('Error storing userId in session:', error);
      }
    };

    storeUserIdInSession();
  }, [userId]);
  
  // to do later store the userID in asyncstorage...and then fetch the it and use it in the index screen
  

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];

    if (msg.text) {
      const myMsg = {
        _id: 'text_' + new Date().getTime(),
        text: msg.text,
        sendBy: senderId,
        createdAt: serverTimestamp(), // Use serverTimestamp() to set the timestamp
        user: {
          _id: senderId,
          name: senderName,
        },
      };
      console.log("senderId:",senderId)
      console.log("userId:",userId)
      // Update the state to display the sent message immediately
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [myMsg]));

      const db = getFirestore();
      await addDoc(collection(db, 'chats', senderId + userId, 'messages'), myMsg);
      await addDoc(collection(db, 'chats', userId + senderId, 'messages'), myMsg);

      
    }
    
  }, []);

  

  const handleSendImage = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
  
      const imageRef = ref(storage, 'chat_images/' + new Date().getTime());
      await uploadBytes(imageRef, blob);
  
      const downloadURL = await getDownloadURL(imageRef);
  
      const imageMessage = {
        _id: 'image_' + new Date().getTime(),
        text: '',
        image: downloadURL, // Store the Firebase Storage URL
        createdAt: new Date(),
        user: {
          _id: senderId,
          name: senderName,
        },
      };
  
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [imageMessage]));
      onSend([imageMessage]); // Send the image message to the chat
  
      // Add the image message to Firestore
      const db = getFirestore();
      await addDoc(collection(db, 'chats', userId + senderId, 'messages'), imageMessage);
      await addDoc(collection(db, 'chats', senderId + userId, 'messages'), imageMessage);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: senderId,
        name: senderName,
      }}
      renderActions={(props) => (
        <CustomImagePicker {...props} onSelectImage={handleSendImage} />
      )}
    />
  );
};

export default NewMessage;

