import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useTheme from '@hooks/useTheme';
import useSwitchUserMode from '@hooks/useSwitchUserMode';
import { Ionicons } from '@expo/vector-icons';
import { LargeText } from '@components/AppText';
import MyAvatar from '../global/MyAvatar';

import ReceiverHomeScreen from '@screens/HomeScreens/ReceiverHomeScreen';
import ProviderHomeScreen from '@screens/HomeScreens/ProviderHomeScreen';
import AvailableServiceScreen from '@screens/AvailableServiceScreen';
import MessageScreen from '@screens/MessageScreen';
import WalletScreen from '@screens/WalletScreen';

const Tab = createBottomTabNavigator();

export default BottomTabNavigator = ({ navigation }) => {
  const [theme] = useTheme()
  const [userMode, x, isModeSwitch] = useSwitchUserMode()

  return (
    <Tab.Navigator
      screenOptions={{
        initialRouteName: "HomeScreen",
        headerShown: !isModeSwitch,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: isModeSwitch ? "none" : "flex",
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
          paddingVertical: 10,
          borderTopColor: theme.PRIMARY_BORDER_COLOR
        },       
        headerStyle: {
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: .5,
          borderBottomColor: theme.PRIMARY_BORDER_COLOR
        },
        headerTitleStyle: { 
          color: theme.PRIMARY_TEXT_COLOR,
          fontFamily: 'FONT_SEMI_BOLD',
        },
      }}
    >
      <Tab.Screen 
        name="HomeScreen" 
        component={userMode === "receiver" ? ReceiverHomeScreen : ProviderHomeScreen}
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
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('ProfileStack', { screen: 'MenuScreen' })}
              style={{ marginLeft: 20 }}
            >
              <MyAvatar />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Image 
                source={require("@assets/images/logo.png")} 
                style={{
                  width: 30,
                  height: 30
                }}
              />
              <LargeText>DecMark</LargeText>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Ionicons name="notifications" size={24} color={theme.PRIMARY_TEXT_COLOR} />
            </TouchableOpacity>
          )
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
          headerTitle: "Services"
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
          headerTitle: "Messages"
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
          headerTitle: "Wallet"
        }}
      />
    </Tab.Navigator>
  )
}