import React, { useEffect } from 'react'
import { 
  StyleSheet,
  Platform,
  Image,
  NativeModules,
} from 'react-native';
import { AppSafeAreaView, AppView } from '../../components/AppViews'
import { MediumText, XtraLargeText } from '../../components/AppText'
import useSwitchUserMode from '../../hooks/useSwitchUserMode'
import useTheme from '../../hooks/useTheme'

const { StatusBarManager } = NativeModules;

export default ModeScreen = ({ navigation }) => {
  const [theme] = useTheme()
  const [userMode] = useSwitchUserMode()

  useEffect(() => {
    setTimeout(() => (
      navigation.replace("BottomTabNavigator", { screen: "HomeScreen" })
    ), 1500)
  }, [])

  return (
    <AppSafeAreaView style={styles.container}>
      <AppView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20
        }}
      >
        <Image 
          source={require("../../assets/images/logo.png")} 
          style={{
            width: 35,
            height: 35
          }}
        />
        <XtraLargeText>DecMark</XtraLargeText>
      </AppView>
      <AppView 
        style={{
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <MediumText style={{ color: theme.PRIMARY_TEXT_COLOR }}>You are being redirected as a</MediumText>
        <XtraLargeText style={{ fontSize: 70 }}>{userMode === "provider" ? "Provider" : "Receiver"}</XtraLargeText>
      </AppView>
    </AppSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  }
})