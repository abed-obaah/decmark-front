import React from 'react'
import { 
  StyleSheet, 
  TouchableOpacity, 
  View,
} from 'react-native'
import { MediumText } from '@components/AppText'
import { Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';
import useTheme from '@hooks/useTheme';

export default MenuOptions = () => {
  const [theme] = useTheme()

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