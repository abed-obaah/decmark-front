import React from 'react';
import { View, Text } from 'react-native';

const CustomMessageBubble = ({ currentMessage, position }) => {
  const isSender = position === 'right';

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {!isSender && <Text style={{ marginRight: 8 }}>{currentMessage.user.name}:</Text>}
      <View
        style={{
          backgroundColor: isSender ? '#007aff' : '#e5e5ea',
          borderRadius: 10,
          padding: 10,
          maxWidth: '80%',
        }}
      >
        {currentMessage.text && <Text style={{ color: isSender ? 'white' : 'black' }}>{currentMessage.text}</Text>}
        {currentMessage.image && <Image source={{ uri: currentMessage.image }} style={{ width: 200, height: 200 }} />}
      </View>
    </View>
  );
};

export default CustomMessageBubble;
