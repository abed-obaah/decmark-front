import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import useAppTheme from "@src/hooks/useAppTheme";
import { MaterialIcons } from "@expo/vector-icons";
import type { RootStackParamList } from "../@types/navigation";
import AccountVerification from "@src/screens/Verification/AccountVerification";

const Stack = createStackNavigator<RootStackParamList>();

const VerificationStackNavigator = () => {
  const { theme } = useAppTheme();

  const options: StackNavigationOptions = {
    headerShown: true,
    headerStyle: {
      backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderBottomColor: theme.PRIMARY_BORDER_COLOR,
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      color: theme.PRIMARY_TEXT_COLOR,
      fontFamily: "SourceSansPro-SemiBold",
    },
    headerBackImage: () => (
      <MaterialIcons name="west" size={24} color={theme.SECONDARY_TEXT_COLOR} />
    ),
    headerLeft:()=>null
  };

  return (
    <Stack.Navigator screenOptions={options} initialRouteName='AccountVerification'>
      <Stack.Screen
        name="AccountVerification"
        component={AccountVerification}
        options={{ headerTitle: "Account Verification" }}
      />
    </Stack.Navigator>
  );
};

export default VerificationStackNavigator;
