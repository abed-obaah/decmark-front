import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';

import Onboarding from '../screens/Onboarding';
import WelcomeScreen from '../screens/WelcomeScreen';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import OTPScreen from '../screens/OTPScreen';

export default AuthNavigation = () => {
  const Stack = createStackNavigator()

  const theme = useSelector(selectTheme)
  NavigationBar.setBackgroundColorAsync(theme.NAVBAR_BACKGROUND_COLOR)
  NavigationBar.setButtonStyleAsync(theme.NAVBAR_BUTTON_COLOR);

  const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(null)

  useEffect(async () => {
    const appData = await AsyncStorage.getItem("isAppFirstLaunch")
    if(appData == null) {
      setIsAppFirstLaunch(true)
      // AsyncStorage.setItem("isAppFirstLaunch", 'false')
    } else {
      setIsAppFirstLaunch(false)
    }
  }, [])

  const options = {
    headerShown: true,
    headerStyle: {
      backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    },
    headerTitle: '',
    headerTintColor: theme.SECONDARY_TEXT_COLOR, 
  }

  return (
    isAppFirstLaunch != null && (
      <>
        <StatusBar style={theme.STATUS_BAR_STYLE} />
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}
          initialRouteName={isAppFirstLaunch ? 'Onboarding' : 'WelcomeScreen'}
        >
          {isAppFirstLaunch &&
            <Stack.Screen name='Onboarding' component={Onboarding} />
          }
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
          <Stack.Screen name='LogIn' component={LogIn} options={{...options}} />
          <Stack.Screen name='SignUp' component={SignUp} options={{...options}} />
          <Stack.Screen name='OTPScreen' component={OTPScreen} options={{...options}} />
        </Stack.Navigator>
      </>
    )
  )
}