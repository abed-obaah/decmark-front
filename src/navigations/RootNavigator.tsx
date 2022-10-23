import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components";
import useTheme from "@src/hooks/useAppTheme";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserInfo } from "@src/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@src/hooks/useAppStore";
import type { RootStackParamList } from "./navigation";

import AuthStackNavigator from "./AuthStackNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import ServiceStackNavigator from "./ServiceStackNavigator";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { userInfo, success } = useAppSelector((state) => state.auth);

  NavigationBar.setBackgroundColorAsync(theme.NAVBAR_BACKGROUND_COLOR);
  NavigationBar.setButtonStyleAsync(theme.NAVBAR_BUTTON_COLOR);

  useEffect(() => {
    getUserInfo();
  }, [success]);

  const getUserInfo = async () => {
    try {
      const info = await AsyncStorage.getItem("user_info");
      dispatch(setUserInfo(info != null ? JSON.parse(info) : null));
    } catch (e) {
      // error reading value
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style={theme.STATUS_BAR_STYLE} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="AuthStack"
        >
          {!userInfo ? (
            <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
          ) : (
            <>
              <Stack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
              />
              <Stack.Screen
                name="ProfileStack"
                component={ProfileStackNavigator}
              />
              <Stack.Screen
                name="ServiceStack"
                component={ServiceStackNavigator}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default RootNavigator;
