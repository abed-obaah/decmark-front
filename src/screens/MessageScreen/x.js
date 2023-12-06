import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { AppSafeAreaView } from '@src/components/AppViews';
import { MediumText, SmallText } from '@src/components/AppText';
import useTheme from '@src/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import PageHeader from '@src/components/PageHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';

export default ChattingScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const route = useRoute();
  const { id, price, user_id, descriptions, type, providerType, names } = route.params;
  const { userInfo } = useSelector((state) => state.auth);
  const senderId = userInfo?.data?.id;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      try {
        const response = await axios.get(`https://api.decmark.com/v1/user/message/message/${user_id}`, {
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
        console.error('Error fetching previous messages:', error.response);
      }
    };

    fetchPreviousMessages();
  }, [user_id, senderId, names]);

  const onSend = useCallback(async (newMessages) => {
    const messageText = newMessages[0].text;

    // Check if this is the first message sent in this chat
    if (messages.length === 0) {
      // This is the first message, create a new chat
      try {
        const messageData = {
          user_id: user_id,
          receiver_id: user_id,
          sender_id: senderId,
          message: messageText,
        };

        const response = await axios.post('https://api.decmark.com/v1/user/message/message/send', messageData, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo?.authentication.token}`,
          },
        });

        console.log('New chat created and message sent:', response.data);
      } catch (error) {
        console.error('Error creating new chat and sending the first message:', error.response);
      }
    } else {
      // This is not the first message, send it as a regular message
      try {
        const messageData = {
          user_id: user_id,
          receiver_id: user_id,
          sender_id: senderId,
          message: messageText,
        };

        const response = await axios.post('https://api.decmark.com/v1/user/message/message/send', messageData, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo?.authentication.token}`,
          },
        });

        console.log('Message sent:', response.data);
      } catch (error) {
        console.error('Error sending message:', error.response);
      }
    }

    // Update the Gifted Chat messages state
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  }, [user_id, senderId, messages]);

  return (
    <AppSafeAreaView>
      <PageHeader title={names} />
      {messages.length > 0 ? (
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
      ) : (
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
      )}
    </AppSafeAreaView>
  );
};
