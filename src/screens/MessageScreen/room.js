import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useSelector } from "react-redux";

export default function MessageScreen() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userInfo } = useSelector((state) => state.auth);
    const userId = userInfo?.data?.id;

  useEffect(() => {
    // Fetch messages when the component mounts
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${userInfo?.authentication.token}`,
      };
    fetch('https://api.decmark.com/v1/user/message/message',
    { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const loggedInUserId = userId; // Replace with the actual logged-in user ID

  const lastSentMessage = messages.find(
    (message) => message.sender_id === loggedInUserId
  );

  const lastReceivedMessage = messages.find(
    (message) => message.sender_id !== loggedInUserId
  );

  return (
    <View>
      {lastSentMessage && (
        <Text style={{ backgroundColor: 'blue', color: 'white' }}>
          You: {lastSentMessage.message}
        </Text>
      )}

      {lastReceivedMessage && (
        <Text style={{ backgroundColor: 'green', color: 'black' }}>
          Received: {lastReceivedMessage.message}
        </Text>
      )}

      {(!lastSentMessage || !lastReceivedMessage) && (
        <Text>You do not have a message yet.</Text>
      )}
    </View>
  );
}
