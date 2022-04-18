import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from './src/screens/Onboarding';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LogIn from './src/screens/LogIn';
import SignUp from './src/screens/SignUp';

const Stack = createStackNavigator()

export default function App() {
  const [isAppFirstLaunch, setIsAppFirstLaunch] = React.useState(null)

  React.useEffect(async () => {
    const appData = await AsyncStorage.getItem("isAppFirstLaunch")
    if(appData == null) {
      setIsAppFirstLaunch(true)
      // AsyncStorage.setItem("isAppFirstLaunch", 'false')
    } else {
      setIsAppFirstLaunch(false)
    }
  }, [])

  return (
    isAppFirstLaunch != null && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAppFirstLaunch &&
            <Stack.Screen name='Onboarding' component={Onboarding} />
          }
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
          <Stack.Screen name='LogIn' component={LogIn} />
          <Stack.Screen name='SignUp' component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}