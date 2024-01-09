import { 
  View,
   Image, 
   TouchableOpacity,
   StyleSheet,
  Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useAppTheme from "@src/hooks/useAppTheme";
import useSwitchUserMode from "@src/hooks/useSwitchUserMode";
import { Ionicons } from "@expo/vector-icons";
import { LargeText } from "@src/components/AppText";
import MyAvatar from "../global/MyAvatar";
import type { RootStackParamList } from "../@types/navigation";
import { useAppSelector, useAppDispatch } from "@src/hooks/useAppStore";
import ReceiverHomeScreen from "@src/screens/HomeScreens/ReceiverHomeScreen";
import ProviderHomeScreen from "@src/screens/HomeScreens/ProviderHomeScreen";
import MyServiceScreen from "@src/screens/MyServiceScreen";
import MessageScreen from "@src/screens/MessageScreen";
import WalletScreen from "@src/screens/WalletScreen";

import React, { useState, useEffect } from 'react';
// import { getUnreadNotificationInboxCount } from 'native-notify';

import axios from "axios";



const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = ({ navigation }: any) => {
  const { theme } = useAppTheme();
  const { userMode, isModeSwitch } = useSwitchUserMode();
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const { userInfo } = useAppSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        let unreadCount = await getUnreadNotificationInboxCount(10360, 'bt5HPDNHpKOD4SdARVdthY');
        console.log("unreadCount: ", unreadCount);
        setUnreadNotificationCount(unreadCount);
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };
  
    fetchUnreadCount();
  }, []);

  useEffect(() => {
    fetchImage();
    // checkPinCreation();
  }, []);

  const fetchImage = async () => {
    try {
      const userId = userInfo?.data?.id;

      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      const response = await axios.get(
        `https://api.decmark.com/v1/user/artisan/user/${userId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo?.authentication.token}`,
          },
        }
      );

      const data = response.data;
      console.log(data)
      setSelectedImage(data.user.profile_img);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: !isModeSwitch,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: isModeSwitch ? "none" : "flex",
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
          paddingVertical: 10,
          borderTopColor: theme.PRIMARY_BORDER_COLOR,
        },
        headerStyle: {
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0.5,
          borderBottomColor: theme.PRIMARY_BORDER_COLOR,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: theme.PRIMARY_TEXT_COLOR,
          // fontFamily: "FONT_SEMI_BOLD",
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={
          userMode === "receiver" ? ReceiverHomeScreen : ProviderHomeScreen
        }
        options={{
          tabBarLabel: "Home",
          tabBarActiveTintColor: theme.PRIMARY_TEXT_COLOR,
          tabBarInactiveTintColor: theme.SECONDARY_TEXT_COLOR,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={
                focused ? theme.PRIMARY_TEXT_COLOR : theme.SECONDARY_TEXT_COLOR
              }
              size={24}
            />
          ),
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileStack", { screen: "MenuScreen" })
              }
              style={{ marginLeft: 20 }}
            >
              <MyAvatar image={selectedImage}/>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("@src/assets/images/logo.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <LargeText>DecMark</LargeText>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 20 }}
            onPress={() =>
              navigation.navigate("ProfileStack", { screen: "NotificationScreen" })
            }
            >
              <View style={styles.notificationBadge}>
                <Ionicons
                  name="notifications"
                  size={24}
                  color={theme.PRIMARY_TEXT_COLOR}
                />
                <View style={styles.unreadCountBadge}>
                  <Text style={styles.unreadCountText}>{unreadNotificationCount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="MyServiceScreen"
        component={MyServiceScreen}
        options={{
          tabBarLabel: "Services",
          tabBarActiveTintColor: theme.PRIMARY_TEXT_COLOR,
          tabBarInactiveTintColor: theme.SECONDARY_TEXT_COLOR,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              color={
                focused ? theme.PRIMARY_TEXT_COLOR : theme.SECONDARY_TEXT_COLOR
              }
              size={24}
            />
          ),
          headerTitle: "My Services",
          headerStyle: {
            backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          tabBarLabel: "Messages",
          tabBarActiveTintColor: theme.PRIMARY_TEXT_COLOR,
          tabBarInactiveTintColor: theme.SECONDARY_TEXT_COLOR,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={
                focused
                  ? "ios-chatbox-ellipses"
                  : "ios-chatbox-ellipses-outline"
              }
              color={
                focused ? theme.PRIMARY_TEXT_COLOR : theme.SECONDARY_TEXT_COLOR
              }
              size={24}
            />
          ),
          headerTitle: "Messages",
        }}
      />
      <Tab.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{
          tabBarLabel: "Wallet",
          tabBarActiveTintColor: theme.PRIMARY_TEXT_COLOR,
          tabBarInactiveTintColor: theme.SECONDARY_TEXT_COLOR,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              color={
                focused ? theme.PRIMARY_TEXT_COLOR : theme.SECONDARY_TEXT_COLOR
              }
              size={24}
            />
          ),
          headerTitle: "Wallet",
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  notificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  unreadCountBadge: {
    backgroundColor: 'red', // Customize badge color
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
  },
  unreadCountText: {
    color: 'white', // Customize text color
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;
