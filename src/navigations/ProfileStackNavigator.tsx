import React from "react";
import { TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useAppTheme from "@src/hooks/useAppTheme";
import type { RootStackParamList } from "../@types/navigation";

import MenuScreen from "@src/screens/MenuScreen";
import AccountScreen from "@src/screens/AccountScreen";
import EditProfileScreen from "@src/screens/EditProfileScreen";
import ProviderProfileScreen from "@src/screens/ProviderProfileScreen";

const Stack = createStackNavigator<RootStackParamList>();

const ProfileStackNavigator = () => {
  const { theme, handleToggleTheme } = useAppTheme();

  const options: StackNavigationOptions = {
    headerShown: true,
    headerStyle: {
      backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      color: theme.PRIMARY_TEXT_COLOR,
      // fontFamily: "FONT_SEMI_BOLD",
    },
    headerTintColor: theme.SECONDARY_TEXT_COLOR,
    headerBackImage: () => (
      <MaterialIcons name="west" size={24} color={theme.SECONDARY_TEXT_COLOR} />
    ),
  };

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleToggleTheme}
              style={{ paddingRight: 20 }}
            >
              <Ionicons
                name={theme.mode === "light" ? "sunny" : "moon"}
                size={24}
                color={theme.SECONDARY_TEXT_COLOR}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerTitle: "My account",
        }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerTitle: "Edit profile",
        }}
      />
      <Stack.Screen
        name="ProviderProfileScreen"
        component={ProviderProfileScreen}
        options={{
          headerTitle: "Provider's Profile",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
