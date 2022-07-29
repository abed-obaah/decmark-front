import { createStackNavigator } from '@react-navigation/stack';
import useTheme from '@hooks/useTheme';
import { MaterialIcons } from '@expo/vector-icons';

import AddServiceScreen from '@screens/AddServiceScreen';
import ScheduleServiceScreen from '@screens/ScheduleServiceScreen';
import OfferDetailScreen from '@screens/OfferDetailScreen';

const Stack = createStackNavigator();

export default ServiceStackNavigator = () => {
  const [theme] = useTheme()

  const options = {
    headerShown: true,
    headerStyle: {
      backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTitleAlign: 'center',
    headerTitleStyle: { 
      color: theme.PRIMARY_TEXT_COLOR,
      fontFamily: 'FONT_SEMI_BOLD', 
    },
    headerBackImage: () => (
      <MaterialIcons name="west" size={24} color={theme.SECONDARY_TEXT_COLOR} />
    )
  }

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen 
        name='AddServiceScreen' 
        component={AddServiceScreen} 
        options={{ headerTitle: "Create Service" }} 
      />
      <Stack.Screen 
        name='ScheduleServiceScreen' 
        component={ScheduleServiceScreen} 
        options={{ headerTitle: "Schedule Service" }} 
      />
      <Stack.Screen 
        name='OfferDetailScreen' 
        component={OfferDetailScreen} 
        options={{ headerTitle: "Offer Details" }} 
      />
    </Stack.Navigator>
  )
}