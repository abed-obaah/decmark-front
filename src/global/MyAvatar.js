import React from 'react'
import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '@hooks/useTheme';

export default MyAvatar = ({ size, iconSize = 20 }) => {
  const [theme] = useTheme();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <View style={{ height: size, width: size }}>
      {userInfo.data.profile_img ? 
        <Image 
          source={userInfo.data.profile_img}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: 'cover',
            borderRadius: 200
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
            borderRadius: 150
          }}
        >
          <Ionicons name="person" size={iconSize} color={theme.PRIMARY_TEXT_COLOR} />
        </View>
      }
    </View>
  )
}

MyAvatar.defaultProps = {    
  size: 35
}