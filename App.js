import 'react-native-gesture-handler';
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import RootNavigator from './src/navigators/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default App = () => {
  NavigationBar.setBackgroundColorAsync('#141414')
  NavigationBar.setButtonStyleAsync("light");

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <RootNavigator />
    </Provider>   
  );
}