import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import type { RootStackParamList } from "../@types/navigation";
import FundWalletScreen from "@src/screens/Wallet/FundWalletScreen";
import TransferScreen from "@src/screens/Wallet/TransferScreen";
import WithdrawScreen from "@src/screens/Wallet/WithdrawScreen";
import ReceiptScreen from "@src/screens/Wallet/ReceiptScreen";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator<RootStackParamList>();

const WalletStackNavigator = () => {

  const options: StackNavigationOptions = {
    headerShown: false,
  }

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        name="WithdrawScreen"
        component={WithdrawScreen}
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
        name="FundWalletScreen"
        component={FundWalletScreen}
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
        name="TransferScreen"
        component={TransferScreen}
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
        name="ReceiptScreen"
        component={ReceiptScreen}
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

export default WalletStackNavigator;
