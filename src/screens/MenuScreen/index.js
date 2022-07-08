import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { AppView, AppScrollView, AppSafeAreaView } from '../../components/AppViews'
import MyAvatar from '../../global/MyAvatar';
import { SmallText, LargeText, MediumText } from '@components/AppText'
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import useTheme from '@hooks/useTheme';
import useSwitchUserMode from '@hooks/useSwitchUserMode';
import MenuOptions from './components/MenuOptions';

export default MenuScreen = ({ navigation }) => {
  const [theme] = useTheme()
  const [userMode, handleToggleUserMode] = useSwitchUserMode()
  const [amountVisible, setAmountVisible] = useState(false)

  return (
    <AppSafeAreaView>
      <AppView style={{ paddingHorizontal : 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileStack", { screen: "AccountScreen" })}
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
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5
                }}
                onPress={() => Clipboard.setString('T76HJK9_DM')} 
              >
                <SmallText style={{ marginRight: 5 }}>UID: T76HJK9_DM</SmallText>
                <Ionicons name="copy" size={15} color={theme.SECONDARY_TEXT_COLOR} />
              </TouchableOpacity>
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
        </TouchableOpacity>

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
            <LargeText>₦ {amountVisible ? "345,050.00" : "XXXXX.XX"}</LargeText>
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

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: theme.INPUT_BACKGROUND_COLOR,
              flexDirection: 'row',
              padding: 2.5,
              marginBottom: 10,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: theme.PRIMARY_BORDER_COLOR
            }}
          >
            {["receiver", "provider"].map((item, i) =>
              <TouchableOpacity
                key={i}
                style={{
                  backgroundColor: item === userMode ? theme.gold : 'transparent',
                  alignItems: 'center',
                  padding: 8.5,
                  paddingHorizontal: 25,
                  borderRadius: 25,
                }}
                onPress={() => handleToggleUserMode(item)}
              >
                <MediumText 
                  style={{
                    color: item === userMode ? theme.dark : theme.SECONDARY_TEXT_COLOR,
                    // fontFamily: 'FONT_SEMI_BOLD',
                    textTransform: 'capitalize',
                  }}
                >{item}</MediumText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </AppView>

      <AppScrollView>
        <MenuOptions />
      </AppScrollView>

      <AppView 
        style={{ 
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 1,
          borderTopColor: theme.PRIMARY_BORDER_COLOR
        }}
      >
        <TouchableOpacity  style={{ paddingVertical: 10 }}>
          <Ionicons 
            name="log-out-outline"
            size={26} 
            color={theme.PRIMARY_TEXT_COLOR} 
          />
        </TouchableOpacity>
        <TouchableOpacity  style={{ paddingVertical: 10 }}>
          <Ionicons 
            name="heart-outline"
            size={26} 
            color={theme.PRIMARY_TEXT_COLOR} 
          />
        </TouchableOpacity>
      </AppView>

    </AppSafeAreaView>
  )
}