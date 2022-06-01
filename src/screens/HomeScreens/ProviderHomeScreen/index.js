import React from 'react'
import { AppSafeAreaView, AppRareScrollView } from '../../../components/AppViews'
import HomeHeader from "../components/HomeHeader";
import ModeScreen from '../ModeScreen';
import useSwitchUserMode from '../../../hooks/useSwitchUserMode';

export default ProviderHomeScreen = () => {
  const [a, b, isModeSwitch] = useSwitchUserMode()
  
  return (
    <>
      {isModeSwitch ? 
        <ModeScreen />
      :
        <AppSafeAreaView>
          <HomeHeader />
          <AppRareScrollView>
          </AppRareScrollView>
        </AppSafeAreaView>
      }
    </>
  )
}