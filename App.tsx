import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import RootNavigator from "@src/navigations/RootNavigator";
import { Provider } from "react-redux";
import { store } from "@src/store";
import { setCustomText, setCustomTextInput } from "react-native-global-props";
import { useFonts } from 'expo-font';
import "@src/global/axios";
import { Platform } from "react-native";

// const customTextProps = {
//   style: { fontFamily: "FONT_REGULAR" },
// };

// setCustomText(customTextProps);
// setCustomTextInput(customTextProps);

const App = () => {
  Platform.OS === 'android'&& NavigationBar.setBackgroundColorAsync("#141414");
  Platform.OS === 'android'&& NavigationBar.setButtonStyleAsync("light");

  const [fontsLoaded] = useFonts({
    'SourceSansPro-Regular': require('./src/assets/fonts/SourceSansPro-Regular.ttf'),
    'SourceSansPro-SemiBold': require('./src/assets/fonts/SourceSansPro-SemiBold.ttf'),

  });

  if (!fontsLoaded) {
    return null;
  }

  // const [isReady, setIsReady] = useState(false);

  // const LoadFonts = async () => {
  //   await useFonts();
  // };

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <RootNavigator />
    </Provider>
  );
};

export default App;
