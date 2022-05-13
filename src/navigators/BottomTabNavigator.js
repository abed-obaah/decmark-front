import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';
import { Ionicons } from '@expo/vector-icons';

import ReceiverHomeScreen from '../screens/HomeScreens/ReceiverHomeScreen';
import AvailableServiceScreen from '../screens/AvailableServiceScreen';
import MessageScreen from '../screens/MessageScreen';
import WalletScreen from '../screens/WalletScreen';

const Tab = createBottomTabNavigator();

export default BottomTabNavigator = () => {
  const theme = useSelector(selectTheme)

  return (
    <Tab.Navigator
      screenOptions={{
        initialRouteName: "ReceiverHomeScreen",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
          paddingVertical: 10,
          borderTopColor: theme.PRIMARY_BORDER_COLOR
        }
      }}
    >
      <Tab.Screen 
        name="ReceiverHomeScreen" 
        component={ReceiverHomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: theme.PRIMARY_TEXT_COLOR,
          tabBarInactiveTintColor: theme.SECONDARY_TEXT_COLOR,
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"}
              color={focused ? theme.PRIMARY_TEXT_COLOR : theme.SECONDARY_TEXT_COLOR} 
              size={24} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="AvailableServiceScreen" 
        component={AvailableServiceScreen}
        options={{
          tabBarLabel: 'Services',
          tabBarActiveTintColor: theme.PRIMARY_TEXT_COLOR,
          tabBarInactiveTintColor: theme.SECONDARY_TEXT_COLOR,
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "compass" : "compass-outline"}
              color={focused ? theme.PRIMARY_TEXT_COLOR : theme.SECONDARY_TEXT_COLOR}
              size={24} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="MessageScreen" 
        component={MessageScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarActiveTintColor: theme.PRIMARY_TEXT_COLOR,
          tabBarInactiveTintColor: theme.SECONDARY_TEXT_COLOR,
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "ios-chatbox-ellipses" : "ios-chatbox-ellipses-outline"}
              color={focused ? theme.PRIMARY_TEXT_COLOR : theme.SECONDARY_TEXT_COLOR}
              size={24} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="WalletScreen" 
        component={WalletScreen}
        options={{
          tabBarLabel: 'Wallet',
          tabBarActiveTintColor: theme.PRIMARY_TEXT_COLOR,
          tabBarInactiveTintColor: theme.SECONDARY_TEXT_COLOR,
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "wallet" : "wallet-outline"}
              color={focused ? theme.PRIMARY_TEXT_COLOR : theme.SECONDARY_TEXT_COLOR}
              size={24} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}