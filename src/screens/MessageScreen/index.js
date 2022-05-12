import React from 'react'
import { View } from 'react-native'
import { AppSafeAreaView } from '../../components/AppViews'
import { MediumText } from "../../components/AppText"

export default MessageScreen = () => {
  return (
    <AppSafeAreaView >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MediumText>Message Screen</MediumText>
      </View>
    </AppSafeAreaView>
  )
}