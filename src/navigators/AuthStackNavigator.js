import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTheme from '../hooks/useTheme';
import { MaterialIcons } from '@expo/vector-icons';

import Onboarding from '../screens/Onboarding';
import WelcomeScreen from '../screens/WelcomeScreen';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import SignUpWithNumber from '../screens/SignUp/SignUpWithNumber';
import OTPScreen from '../screens/OTPScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default AuthStackNavigator = () => {
  const [theme] = useTheme()

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
    headerTitleAlign: 'center',
    headerTitleStyle: { 
      color: theme.PRIMARY_TEXT_COLOR,
      fontFamily: 'FONT_SEMI_BOLD',
    },
    headerTintColor: theme.SECONDARY_TEXT_COLOR, 
    headerBackImage: () => (
      <MaterialIcons name="west" size={24} color={theme.SECONDARY_TEXT_COLOR} />
    )
  }

  return (
    isAppFirstLaunch != null && (
      <>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}
          initialRouteName={isAppFirstLaunch ? 'Onboarding' : 'WelcomeScreen'}
        >
          {isAppFirstLaunch &&
            <Stack.Screen name='Onboarding' component={Onboarding} />
          }
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
          <Stack.Screen name='LogIn' component={LogIn} options={{...options, headerTitle: "Account Login"}} />
          <Stack.Screen name='SignUp' component={SignUp} options={{...options, headerTitle: ""}} />
          <Stack.Screen name='SignUpWithNumber' component={SignUpWithNumber} options={{...options, headerTitle: "Create Account"}} />
          <Stack.Screen name='OTPScreen' component={OTPScreen} options={{...options, headerTitle: "Verification"}} />
          <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} options={{...options, headerTitle: "Forgot Password"}} />
        </Stack.Navigator>
      </>
    )
  )
}