import React from 'react'
import { ScrollView } from 'react-native';
import { AppSafeAreaView } from '../../../components/AppViews'
import HomeHeader from "../components/HomeHeader";
import CategorySection from "./components/CategorySection";
import PopularServices from './components/PopularServices';
import RatedProviders from './components/RatedProviders';

export default ReceiverHomeScreen = () => {
  return (
    <AppSafeAreaView>
      <HomeHeader />
      <ScrollView>
        <CategorySection />
        <PopularServices />
        <RatedProviders />
      </ScrollView>
    </AppSafeAreaView>
  )
}