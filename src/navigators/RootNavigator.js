import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';

import AuthStackNavigator from './AuthStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

export default RootNavigator = () => {
  const theme = useSelector(selectTheme)

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
          <Stack.Screen name='AuthStackNavigator' component={AuthStackNavigator} />
          <Stack.Screen name='BottomTabNavigator' component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}