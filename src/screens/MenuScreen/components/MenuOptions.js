import React from 'react'
import { 
  StyleSheet, 
  TouchableOpacity, 
  View,
  ImageBackground,
  Text
} from 'react-native'
import { MediumText, SmallText } from '@components/AppText'
import { Ionicons, EvilIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import useTheme from '@hooks/useTheme';
import useSwitchUserMode from '@hooks/useSwitchUserMode';

export default MenuOptions = () => {
  const [theme] = useTheme()
  const [userMode, handleToggleUserMode] = useSwitchUserMode()

  const menuOptions = [
    {
      lable: "Settings",
      icon: <Ionicons name="settings" size={24} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
    {
      lable: "Security",
      icon: <Ionicons name="shield-checkmark" size={24} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
    {
      lable: "Verification",
      icon: <Entypo name="v-card" size={23} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
    {
      lable: "Notifications",
      icon: <Ionicons name="notifications" size={24} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
    {
      lable: "History",
      icon: <Ionicons name="time" size={24} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
    {
      lable: "Help & Support",
      icon: <Ionicons name="help-circle" size={24} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
    {
      lable: "My Referral",
      icon: <Ionicons name="person-add" size={24} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
  ]

  return (
    <>
      <TouchableOpacity onPress={handleToggleUserMode}>
        <ImageBackground 
          source={require("../../../assets/images/mode.jpg")} 
          resizeMode="cover" 
          imageStyle={{ 
            borderRadius: 5, 
            borderWidth: 1, 
            borderColor: theme.PRIMARY_BORDER_COLOR,
          }}
          style={{ width: '100%', height: 55 }}
        >
          <View 
            style={{ 
              backgroundColor: theme.mode === 'light' ? 'rgba(255, 255, 255, .5)' : 'rgba(20, 20, 20, .95)',
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 12,
              borderRadius: 5
            }}
          >
            <View>
              <MediumText style={{ color: theme.PRIMARY_TEXT_COLOR }}>
                {userMode === "provider" ? "Receiver" : "Provider" }
                <Text style={{ color: theme.GOLDEN_TEXT }}> Mode</Text>
              </MediumText>
              <SmallText>Activate to become a service {userMode === "provider" ? "receiver" : "provider" }</SmallText>
            </View>
            <MaterialIcons name="east" size={20} color={theme.SECONDARY_TEXT_COLOR} />
          </View>
        </ImageBackground>
      </TouchableOpacity>
      {menuOptions.map((item, i) => 
        <TouchableOpacity key={i} onPress={() => item.screen}>
          <View style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {item.icon}
              <View style={{ marginLeft: 20 }}>
                <MediumText style={{ color: theme.PRIMARY_TEXT_COLOR }}>{item.lable}</MediumText>
              </View>
            </View>
            <EvilIcons 
              name="chevron-right" 
              size={25} 
              color={theme.SECONDARY_TEXT_COLOR}
            />
          </View>
        </TouchableOpacity>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18
  }
})