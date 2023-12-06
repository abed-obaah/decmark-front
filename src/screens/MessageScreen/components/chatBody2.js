import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { AppSafeAreaView } from '@src/components/AppViews';
import { MediumText } from '@src/components/AppText';
import useTheme from '@src/hooks/useAppTheme';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ChatBody = ({ navigation }) => {
  const { theme } = useTheme();
  const route = useRoute();
  const { names, user2Id } = route.params; // user2Id represents the other user's ID
  const { userInfo } = useSelector((state) => state.auth);
  const senderId = userInfo?.data?.id;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      try {
        const response = await axios.get(`https://api.decmark.com/v1/user/message/message/${user2Id}`, {
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
            _id: message.sender_id,
            name: message.sender_id === senderId ? 'You' :'',
            avatar: 'https://placeimg.com/140/140/any',
          },
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error('Error fetching previous messages:', error.response);
      }
    };

    fetchPreviousMessages();
  }, [user2Id, senderId,]);

  const onSend = useCallback(async (newMessages) => {
    const messageText = newMessages[0].text;

    if (newMessages.length > 0) {
      try {
        const messageData = {
          user_id: senderId,
          receiver_id: user2Id,
          sender_id: senderId,
          message: messageText,
        };

        const response = await axios.post('https://api.decmark.com/v1/user/message/message/send', messageData, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${userInfo?.authentication.token}`,
          },
        });

        console.log('Message sent:', response.data);
      } catch (error) {
        console.error('Error sending message:', error.response);
      }

      // Update the Gifted Chat messages state
      setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    }
  }, [user2Id, senderId, messages, userInfo]);

  return (
    <AppSafeAreaView>
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: senderId, // Set the sender's user ID
          }}
          renderAvatar={null}
          renderUsernameOnMessage
          showUserAvatar={false}
          renderChatHeader={() => (
            <View style={{ padding: 10, alignItems: 'center' }}>
              <MediumText>''</MediumText>
            </View>
          )}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default ChatBody;