import React from 'react'
import { AppSafeAreaView, AppRareScrollView } from '../../../components/AppViews'
import HomeHeader from "../components/HomeHeader";

export default ProviderHomeScreen = () => {
  return (
    <AppSafeAreaView>
      <HomeHeader />
      <AppRareScrollView>
      </AppRareScrollView>
    </AppSafeAreaView>
  )
}