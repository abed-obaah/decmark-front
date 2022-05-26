import React from 'react'
import { 
  StyleSheet, 
  TouchableOpacity, 
  View
} from 'react-native'
import { MediumText } from '../../../components/AppText'
import { Ionicons, EvilIcons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import useTheme from '../../../hooks/useTheme';

export default MenuOptions = () => {
  const [theme] = useTheme()

  const menuOptions = [
    {
      lable: "Account",
      icon: <Feather name="user" size={20} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
    {
      lable: "Verification",
      icon: <MaterialIcons name="verified-user" size={20} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
    {
      lable: "Settings",
      icon: <Ionicons name="settings-outline" size={20} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
    {
      lable: "Referral",
      icon: <Feather name="users" size={20} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
    {
      lable: "Customer Support",
      icon: <FontAwesome5 name="headphones-alt" size={20} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
    {
      lable: "Security",
      icon: <MaterialIcons name="security" size={20} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    },
    {
      lable: "Review App",
      icon: <FontAwesome5 name="heart" size={20} color={theme.SECONDARY_TEXT_COLOR} />,
      screen: "sdfsdf"
    }
  ]

  return (
    <>
      {menuOptions.map((item, i) => 
        <TouchableOpacity key={i} onPress={() => item.screen}>
          <View style={styles.menuItem}>
            <View style={{ flexDirection: 'row' }}>
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
      <TouchableOpacity>
        <View style={styles.menuItem}>
          <View style={{ flexDirection: 'row' }}>
          <Ionicons name="exit-outline" size={20} color={theme.red} />
            <View style={{ marginLeft: 20 }}>
              <MediumText style={{ color: theme.red }}>Logout</MediumText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  userMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18
  }
})