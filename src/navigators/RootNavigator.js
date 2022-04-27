import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator()

export default RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="AuthNavigator"
      >
        <Stack.Screen name='AuthNavigator' component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}