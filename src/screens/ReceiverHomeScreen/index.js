import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AppSafeAreaView } from '../../components/AppViews'
import { MediumText } from "../../components/AppText"

export default ReceiverHomeScreen = () => {
  return (
    <AppSafeAreaView >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MediumText>Receiver's Home Screen</MediumText>
      </View>
    </AppSafeAreaView>
  )
}

const styles = StyleSheet.create({})