import React from 'react'
import { AppSafeAreaView, AppRareScrollView } from '../../../components/AppViews'
import HomeHeader from "../components/HomeHeader";
import CategorySection from "./components/CategorySection";
import PopularServices from './components/PopularServices';
import RatedProviders from './components/RatedProviders';
import SwitchModeInfo from '../components/SwitchModeInfo';
import useSwitchUserMode from '../../../hooks/useSwitchUserMode';

export default ReceiverHomeScreen = () => {
  const [a, b, isModeSwitch] = useSwitchUserMode()

  return (
    <>
      {isModeSwitch ? 
        <SwitchModeInfo />
      :
        <AppSafeAreaView>
          <HomeHeader />
          <AppRareScrollView>
            <CategorySection />
            <PopularServices />
            <RatedProviders />
          </AppRareScrollView>
        </AppSafeAreaView>
      }
    </>
  )
}