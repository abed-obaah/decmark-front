import { createStackNavigator } from '@react-navigation/stack';
import useTheme from '../hooks/useTheme';

import AddServiceScreen from '../screens/AddServiceScreen';

const Stack = createStackNavigator();

export default ServiceStackNavigator = () => {
  const [theme] = useTheme()

  const options = {
    headerShown: true,
    headerStyle: {
      backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    },
    headerTitleAlign: 'center',
    headerTitleStyle: { color: theme.PRIMARY_TEXT_COLOR },
    headerTintColor: theme.SECONDARY_TEXT_COLOR, 
  }

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen 
        name='AddServiceScreen' 
        component={AddServiceScreen} 
        options={{ headerTitle: "Post a service" }} 
      />
    </Stack.Navigator>
  )
}