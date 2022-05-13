import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AppSafeAreaView } from '../../../components/AppViews'
import { MediumText } from "../../../components/AppText"
import HomeHeader from "../components/HomeHeader";

export default ReceiverHomeScreen = () => {
  return (
    <AppSafeAreaView>
      <HomeHeader />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MediumText>Receiver's Home Screen</MediumText>
      </View>
    </AppSafeAreaView>
  )
}