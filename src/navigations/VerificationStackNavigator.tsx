import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import type { RootStackParamList } from "../@types/navigation";
import AccountVerification from "@src/screens/Verification/AccountVerification";
import OTPScreen from "@src/screens/Verification/OTPScreen";
import EmailOTPScreen from "@src/screens/Verification/EmailOTPScreen";
import UploadScreen from "@src/screens/Verification/UploadScreen";
import DocumentDetails from "@src/screens/Verification/DocumentDetails";
import DriversLic from "@src/screens/Verification/DriversLic";
import Bvn from "@src/screens/Verification/Bvn";
import VotersCard from "@src/screens/Verification/VotersCard";
import Vnin from "@src/screens/Verification/Vnin";
import NationalPass from "@src/screens/Verification/NationalPass";
import TakeSnapshot from "@src/screens/Verification/TakeSnapshot";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";

const Stack = createStackNavigator<RootStackParamList>();

const VerificationStackNavigator = () => {

  const options: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={options} initialRouteName='AccountVerification'>
      <Stack.Screen
        name="AccountVerification"
        component={AccountVerification}
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
        name="OTPScreen"
        component={OTPScreen}
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
        name="EmailOTPScreen"
        component={EmailOTPScreen}
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
        name="UploadScreen"
        component={UploadScreen}
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
        name="DocumentDetails"
        component={DocumentDetails}
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
        name="NationalPass"
        component={NationalPass}
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
        name="DriversLic"
        component={DriversLic}
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
        name="Bvn"
        component={Bvn}
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
        name="VotersCard"
        component={VotersCard}
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
        name="Vnin"
        component={Vnin}
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
      {/* <Stack.Screen
        name="DocumentDetails"
        component={DocumentDetails}
      /> */}
      <Stack.Screen
        name="TakeSnapshot"
        component={TakeSnapshot}
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

export default VerificationStackNavigator;
