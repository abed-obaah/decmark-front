import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { selectTheme } from '../redux/slices/themeSlice';

import AuthNavigation from './AuthNavigation';

export default RootNavigation = () => {
  const Stack = createStackNavigator()

  const theme = useSelector(selectTheme)

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}
          initialRouteName="AuthNavigation"
        >
          <Stack.Screen name='AuthNavigation' component={AuthNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}