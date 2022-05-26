import React, { useState } from 'react'
import { View, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { AppView, AppScrollView, AppSafeAreaView } from '../../components/AppViews'
import MyAvatar from '../../global/MyAvatar';
import { SmallText, LargeText, MediumText } from '../../components/AppText'
import { Ionicons, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';
import MenuOptions from './components/MenuOptions';

export default MenuScreen = () => {
  const [theme] = useTheme()
  const [amountVisible, setAmountVisible] = useState(false)

  return (
    <AppSafeAreaView>
      <AppView 
        style={{ 
          paddingHorizontal : 20,
          paddingBottom: 10
        }}
      >
        <View
          style={{ 
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View
            style={{ 
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <MyAvatar size={45} />
            <View style={{ width: 10 }} />
            <View>
              <LargeText>@johnphealipto</LargeText>
              <SmallText style={{ marginTop: 5 }}>UID: T76HJK9_DM</SmallText>
            </View>
           </View>
          <EvilIcons 
            name="chevron-right" 
            size={35} 
            color={theme.SECONDARY_TEXT_COLOR} 
            style={{ 
              justifyContent: 'flex-end',
              right: 0
            }}
          />
        </View>

        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity>
              <Ionicons name="refresh-circle" size={26} color={theme.PRIMARY_TEXT_COLOR} />
            </TouchableOpacity>
            <View style={{ width: 5 }} />
            <LargeText>₦ {amountVisible ? "345,050.00" : "XXXXXX.XX"}</LargeText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity onPress={() => setAmountVisible(!amountVisible)}>
              <Ionicons 
                name={amountVisible ? "eye-off" : "eye"} 
                size={26} 
                color={theme.PRIMARY_TEXT_COLOR} 
              />
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity>
              <Ionicons 
                name="add-circle"
                size={26} 
                color={theme.PRIMARY_TEXT_COLOR} 
              />
            </TouchableOpacity>
          </View>
        </View>
        <ImageBackground 
          source={require("../../assets/images/mode.jpg")} 
          resizeMode="cover" 
          imageStyle={{ borderRadius: 5 }}
          style={{ width: '100%', height: 55 }}
        >
          <View 
            style={{ 
              backgroundColor: 'rgba(20, 20, 20, .95)',
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 12
            }}
          >
            <View>
              <MediumText style={{ color: theme.PRIMARY_TEXT_COLOR }}>
                Provider 
                <Text style={{ color: theme.gold }}> mode</Text>
              </MediumText>
              <SmallText>Activate to become a service provider</SmallText>
            </View>
            <MaterialIcons name="east" size={20} color={theme.SECONDARY_TEXT_COLOR} />
          </View>
        </ImageBackground>
      </AppView>

      <AppScrollView>
        <MenuOptions />
        <MediumText style={{ paddingBottom: 15 }}>Version 1.0.0</MediumText>
      </AppScrollView>

    </AppSafeAreaView>
  )
}