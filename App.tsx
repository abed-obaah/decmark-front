import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import RootNavigator from "@src/navigations/RootNavigator";
import { Provider } from "react-redux";
import { store } from "@src/store";
import { setCustomText, setCustomTextInput } from "react-native-global-props";
import useFonts from "@src/hooks/useFonts";
import "@src/global/axios";

// const customTextProps = {
//   style: { fontFamily: "FONT_REGULAR" },
// };

// setCustomText(customTextProps);
// setCustomTextInput(customTextProps);

const App = () => {
  NavigationBar.setBackgroundColorAsync("#141414");
  NavigationBar.setButtonStyleAsync("light");

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
