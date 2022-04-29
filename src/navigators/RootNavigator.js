import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { selectTheme } from '../redux/slices/themeSlice';

import AuthNavigator from './AuthNavigator';

export default RootNavigator = () => {
  const Stack = createStackNavigator()

  const theme = useSelector(selectTheme)

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}
          initialRouteName="AuthNavigator"
        >
          <Stack.Screen name='AuthNavigator' component={AuthNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}