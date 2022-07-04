import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components';
import useTheme from '@hooks/useTheme';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';

import AuthStackNavigator from './AuthStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import ServiceStackNavigator from './ServiceStackNavigator';

const Stack = createStackNavigator();

export default RootNavigator = () => {
  const [theme] = useTheme()

  NavigationBar.setBackgroundColorAsync(theme.NAVBAR_BACKGROUND_COLOR)
  NavigationBar.setButtonStyleAsync(theme.NAVBAR_BUTTON_COLOR);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style={theme.STATUS_BAR_STYLE} />
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}
          initialRouteName="AuthStackNavigator"
        >
          {/* <Stack.Screen name='AuthStackNavigator' component={AuthStackNavigator} /> */}
          <Stack.Screen name='BottomTabNavigator' component={BottomTabNavigator} />
          <Stack.Screen name='ProfileStack' component={ProfileStackNavigator} />
          <Stack.Screen name='ServiceStack' component={ServiceStackNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}