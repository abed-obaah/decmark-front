import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator()

export default TopTabNavigator = ({  }) => {
  return (
    <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            initialRouteName: "Help",
            tabBarStyle: {
              backgroundColor: 'white',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0
            }, 
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'blue',
            tabBarPressColor: 'blue',
            tabBarScrollEnabled: true,
            tabBarContentContainerStyle: {
              alignItems: "center",
              justifyContent: 'center',
            },
            tabBarItemStyle: {
              width: 'auto',
              paddingHorizontal: 20,
            },
            tabBarLabelStyle: {
              textTransform: 'capitalize'
            },
            tabBarIndicatorStyle: {
              borderBottomColor: 'red',
              borderBottomWidth: 2.5,
            },
          }}
        >
          {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
  )
}