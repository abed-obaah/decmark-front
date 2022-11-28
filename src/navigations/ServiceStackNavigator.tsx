import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import useAppTheme from "@src/hooks/useAppTheme";
import { MaterialIcons } from "@expo/vector-icons";
import type { RootStackParamList } from "../@types/navigation";

import AddServiceScreen from "@src/screens/AddServiceScreen";
import ScheduleServiceScreen from "@src/screens/ScheduleServiceScreen";
import OfferDetailScreen from "@src/screens/OfferDetailScreen";
import AvailableServiceScreen from "@src/screens/AvailableServiceScreen";

const Stack = createStackNavigator<RootStackParamList>();

const ServiceStackNavigator = () => {
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
      // fontFamily: "FONT_SEMI_BOLD",
    },
    headerBackImage: () => (
      <MaterialIcons name="west" size={24} color={theme.SECONDARY_TEXT_COLOR} />
    ),
  };

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        name="AddServiceScreen"
        component={AddServiceScreen}
        options={{ headerTitle: "Create Service" }}
      />
      <Stack.Screen
        name="ScheduleServiceScreen"
        component={ScheduleServiceScreen}
        options={{ headerTitle: "Schedule Service" }}
      />
      <Stack.Screen
        name="OfferDetailScreen"
        component={OfferDetailScreen}
        options={{ headerTitle: "Offer Details" }}
      />
      <Stack.Screen
        name="AvailableServiceScreen"
        component={AvailableServiceScreen}
        options={{ headerTitleAlign: "left" }}
      />
    </Stack.Navigator>
  );
};

export default ServiceStackNavigator;
