import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import type { RootStackParamList } from "../@types/navigation";
import AccountVerification from "@src/screens/Verification/AccountVerification";
import OTPScreen from "@src/screens/Verification/OTPScreen";

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
      />
       <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
      />
    </Stack.Navigator>
  );
};

export default VerificationStackNavigator;
