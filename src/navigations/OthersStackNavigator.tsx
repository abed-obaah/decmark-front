import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import type { RootStackParamList } from "../@types/navigation";
import ChattingScreen from "@src/screens/MessageScreen/ChattingScreen";
import MessageScreen from "@src/screens/MessageScreen/index";
import ChatBody from "@src/screens/MessageScreen/components/ChatBody";

const Stack = createStackNavigator<RootStackParamList>();

const OthersStackNavigator = () => {

  const options: StackNavigationOptions = {
    headerShown: false,
  }

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        name="ChattingScreen"
        component={ChattingScreen}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
      />
      <Stack.Screen
        name="ChatBody"
        component={ChatBody}
      />
    </Stack.Navigator>
  );
};

export default OthersStackNavigator;
