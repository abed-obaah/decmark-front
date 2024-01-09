import React, { useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native-animatable';
import { Text, Image,StyleSheet,TouchableOpacity} from 'react-native';
import MyAvatar from "@src/global/MyAvatar";
import { useRoute } from '@react-navigation/native';



const ChatRoomScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector((state) => state.auth?.userInfo?.data?.id);
  const [userId, setUserId] = useState('');
  const [senderId, setSenderId] = useState('');

  const navigateToChat = () => {
    navigation.navigate("OthersStack", {
      screen: "ChattingScreen",
      params: {},
      userId:userId,
      senderId:senderId
    });
  };


  useEffect(() => {
    const retrieveUserIdFromStorage = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            const storedSenderId = await AsyncStorage.getItem('senderId');
            setUserId(storedUserId || ''); // Update state with the retrieved userId
            setSenderId(storedSenderId || ''); // Update state with the retrieved userId
        } catch (error) {
            console.error('Error retrieving userId from AsyncStorage:', error);
        }
    };

    retrieveUserIdFromStorage();
}, []);



useEffect(() => {
  const fetchChatMessages = async () => {
    if (!userId || !senderId) {
      console.error('Missing userId or senderId');
      return;
    }

    const db = getFirestore();
    const chatId = [userId, senderId].sort().join(''); // Combine user IDs without any separator
    const messagesRef = collection(db, `chats/${chatId}/messages`); // Create a reference to the messages subcollection

    const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'));

    try {
      const querySnapshot = await getDocs(messagesQuery);
      const fetchedMessages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.sendBy,
          },
        };
      });
      setMessages(fetchedMessages);
      console.log(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  fetchChatMessages();
}, [userId, senderId]);

const [userData, setUserData] = useState(null);

  
  // Function to fetch user data based on the user ID
  const fetchUserData = async (userId,senderId) => {
    try {
      console.log("userid:",userId)
      console.log("senderId:",senderId)
      const response = await fetch(`https://api.decmark.com/v1/user/artisan/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        console.log(data) // Update state with fetched user data
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Fetch user data when messages change
    if (messages.length > 0) {
      fetchUserData(messages[1].user._id);
    }
  }, [messages]);



  const onSend = async (newMessages = []) => {
    // Logic to send new messages
  };

  return (
    <View >
    {/* Your existing UI */}
    {/* Display user data fetched from the endpoint */}
    {userData && (
      <TouchableOpacity onPress={navigateToChat}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
        <MyAvatar size={50} iconSize={10} image={userData.user.profile_img}/>
        </View>
        <View style={styles.textContainer}>
        <Text>{userData.user.first_name}</Text>
        <Text>{userData.user.last_name}</Text>
      </View>
      </View>
      </TouchableOpacity>
    )}
  </View>
  );
  
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    justifyContent: 'center',
  },
});
export default ChatRoomScreen;
