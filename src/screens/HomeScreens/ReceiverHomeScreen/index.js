import React from 'react'
import { AppSafeAreaView, AppRareScrollView } from '../../../components/AppViews'
import HomeHeader from "../components/HomeHeader";
import CategorySection from "./components/CategorySection";
import PopularServices from './components/PopularServices';
import RatedProviders from './components/RatedProviders';

export default ReceiverHomeScreen = () => {
  return (
    <AppSafeAreaView>
      <HomeHeader />
      <AppRareScrollView>
        <CategorySection />
        <PopularServices />
        <RatedProviders />
      </AppRareScrollView>
    </AppSafeAreaView>
  )
}