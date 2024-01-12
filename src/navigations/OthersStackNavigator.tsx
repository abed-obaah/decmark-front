import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import type { RootStackParamList } from "../@types/navigation";
import ChattingScreen from "@src/screens/MessageScreen/ChattingScreen";
import MessageScreen from "@src/screens/MessageScreen/index";
import ChatBody from "@src/screens/MessageScreen/components/ChatBody";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ChatBody"
        component={ChatBody}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default OthersStackNavigator;
