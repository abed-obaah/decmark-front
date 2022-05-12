import React from 'react'
import { View } from 'react-native'
import { AppSafeAreaView } from '../../components/AppViews'
import { MediumText } from "../../components/AppText"

export default AvailableServiceScreen = () => {
  return (
    <AppSafeAreaView >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MediumText>Services Screen</MediumText>
      </View>
    </AppSafeAreaView>
  )
}