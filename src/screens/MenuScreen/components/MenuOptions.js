import React from 'react'
import { 
  StyleSheet, 
  TouchableOpacity, 
  View,
  ImageBackground,
  Text
} from 'react-native'
import { MediumText, SmallText } from '../../../components/AppText'
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
              Provider 
              <Text style={{ color: theme.mode === 'light' ? theme.darkGold : theme.gold }}> mode</Text>
            </MediumText>
            <SmallText>Activate to become a service provider</SmallText>
          </View>
          <MaterialIcons name="east" size={20} color={theme.SECONDARY_TEXT_COLOR} />
        </View>
      </ImageBackground>
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