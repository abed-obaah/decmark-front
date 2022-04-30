import 'react-native-gesture-handler';
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import RootNavigation from './src/navigations/RootNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default App = () => {
  NavigationBar.setBackgroundColorAsync('#141414')
  NavigationBar.setButtonStyleAsync("light");

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <RootNavigation />
    </Provider>   
  );
}