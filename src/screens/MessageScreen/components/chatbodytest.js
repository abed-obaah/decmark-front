import React, { useState, useCallback, useEffect } from 'react';
import { View, Platform } from 'react-native';
import { AppSafeAreaView } from '@src/components/AppViews';
import { MediumText, SmallText } from '@src/components/AppText';
import useTheme from '@src/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import PageHeader from '@src/components/PageHeader';
import axios from 'axios'; // Import axios for making API requests
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';

const ChatBody = ({ navigation }) => {
  const { theme } = useTheme();
  const route = useRoute();
  const { id, price, user_id, descriptions, type, providerType, names } = route.params;
  const { userInfo } = useSelector((state) => state.auth);
  const senderId = userInfo?.data?.id;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      try {
        // Make an API request to fetch messages from Laravel backend
        const response = await axios.get(`https://api.decmark.com/v1/user/message/fetch/${user_id}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${userInfo?.authentication.token}`,
          },
        });

        const formattedMessages = response.data.map((message) => ({
          _id: message.id,
          text: message.message,
          createdAt: new Date(message.created_at),
          user: {
            _id: message.sender_id === senderId ? 1 : 2,
            name: message.sender_id === senderId ? 'You' : names,
            avatar: 'https://placeimg.com/140/140/any',
          },
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.log('Error fetching previous messages:', error.response);
      }
    };

    fetchPreviousMessages();
  }, [user_id, senderId, names, dispatch]);

  const onSend = useCallback(async (newMessages) => {
    const messageText = newMessages[0].text;

    // Create a message object to send to the Laravel backend
    const messageData = {
      sender_id: senderId,
      receiver_id: user_id,
      message: messageText,
    };

    try {
      // Make an API request to send a message
      const response = await axios.post('https://api.decmark.com/v1/user/message/send', messageData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${userInfo?.authentication.token}`,
        },
      });

      console.log('Message sent:', response.data);

      // Update the Gifted Chat messages state
      setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    } catch (error) {
      console.error('Error sending message:', error.response);
    }
  }, [user_id, senderId, messages]);

  return (
    <AppSafeAreaView>
      <PageHeader title={names} />
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
        renderAvatar={null}
        renderUsernameOnMessage
        showUserAvatar={false}
        renderChatHeader={() => (
          <View style={{ padding: 10, alignItems: 'center' }}>
            <MediumText>{names}</MediumText>
          </View>
        )}
      />
    </AppSafeAreaView>
  );
};

export default ChatBody;
