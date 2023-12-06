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
      />
       <Stack.Screen
        name="FundWalletScreen"
        component={FundWalletScreen}
      />
       <Stack.Screen
        name="TransferScreen"
        component={TransferScreen}
      />
       <Stack.Screen
        name="ReceiptScreen"
        component={ReceiptScreen}
      />
    </Stack.Navigator>
  );
};

export default WalletStackNavigator;
