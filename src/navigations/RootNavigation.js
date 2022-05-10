import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { selectTheme } from '../redux/slices/themeSlice';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';

import AuthNavigation from './AuthNavigation';
import DashboardStackNavigation from './DashboardStackNavigation';

export default RootNavigation = () => {
  const Stack = createStackNavigator()

  const theme = useSelector(selectTheme)

  NavigationBar.setBackgroundColorAsync(theme.NAVBAR_BACKGROUND_COLOR)
  NavigationBar.setButtonStyleAsync(theme.NAVBAR_BUTTON_COLOR);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style={theme.STATUS_BAR_STYLE} />
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}
          initialRouteName="AuthNavigation"
        >
          <Stack.Screen name='AuthNavigation' component={AuthNavigation} />
          <Stack.Screen name='DashboardStackNavigation' component={DashboardStackNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}