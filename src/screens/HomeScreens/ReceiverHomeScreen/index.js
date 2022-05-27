import React from 'react'
import { AppSafeAreaView, AppScrollView } from '../../../components/AppViews'
import HomeHeader from "../components/HomeHeader";
import PopularServices from './components/PopularServices';
import RatedProviders from './components/RatedProviders';

export default ReceiverHomeScreen = () => {
  return (
    <AppSafeAreaView>
      <HomeHeader />
      <AppScrollView>
        <PopularServices />
        <RatedProviders />
      </AppScrollView>
    </AppSafeAreaView>
  )
}