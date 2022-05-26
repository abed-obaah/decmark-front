import React from 'react'
import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';

export default MyAvatar = ({ size }) => {
  const [theme] = useTheme()

  // const myAvatar = null
  const myAvatar = require("../assets/images/my_avatar.png")

  return (
    <View style={{ height: size, width: size }}>
      {myAvatar ? 
        <Image 
          source={myAvatar} 
          style={{
            height: "100%",
            width: "100%",
            resizeMode: 'cover',
            borderRadius: 50
          }} 
        />
      :
        <View 
          style={{ 
            backgroundColor: theme.PRIMARY_BORDER_COLOR, 
            height: "100%",
            width: "100%", 
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50
          }}
        >
          <Ionicons name="person" size={22.5} color={theme.PRIMARY_TEXT_COLOR} />
        </View>
      }
    </View>
  )
}

MyAvatar.defaultProps = {    
  size: 35
}