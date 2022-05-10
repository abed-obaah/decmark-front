import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ReceiverHomeScreen from '../screens/ReceiverHomeScreen';

export default DashboardStackNavigation = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='ReceiverHomeScreen' component={ReceiverHomeScreen} />
    </Stack.Navigator>
  )
}