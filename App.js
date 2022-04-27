import 'react-native-gesture-handler';
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import RootNavigator from './src/navigators/RootNavigator';

export default function App() {
  NavigationBar.setBackgroundColorAsync('#141414')
  NavigationBar.setButtonStyleAsync("light");

  return (
    <>
      <StatusBar style="light" />
      <RootNavigator />
    </>
  );
}