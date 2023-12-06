import "react-native-gesture-handler";
import React, { useState,useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import RootNavigator from "@src/navigations/RootNavigator";
import { Provider } from "react-redux";
import { store } from "@src/store";
import { setCustomText, setCustomTextInput } from "react-native-global-props";
import { useFonts } from 'expo-font';
import "@src/global/axios";
import { Platform, Alert} from "react-native";
// import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// import { Provider as PaperProvider } from "react-native-paper";
import thunk from "redux-thunk";
// import firebase from './firebase'
import messaging from '@react-native-firebase/messaging';
// import rootReducer from "./reducers";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import registerNNPushToken from 'native-notify';
// import { initializeApp } from '@react-native-firebase/app';
import Toast from 'react-native-toast-message';

// const customTextProps = {
//   style: { fontFamily: "FONT_REGULAR" },
// };

// setCustomText(customTextProps);
// setCustomTextInput(customTextProps);


const App = () => {
  registerNNPushToken(10360, 'bt5HPDNHpKOD4SdARVdthY');
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }
  // useEffect(()=>{
  //   if(requestUserPermission()){
  //     //return fcm token for the device
  //     messaging().getToken.then(token => {
  //       console.log(token);
  //     });
  //   }
  //   else{
  //     console.log('failed token status:', authStatus);
  //   }

  //    // Check whether an initial notification is available
  //    messaging()
  //    .getInitialNotification()
  //    .then( async (remoteMessage) => {
  //      if (remoteMessage) {
  //        console.log(
  //          'Notification caused app to open from quit state:',
  //          remoteMessage.notification,
  //        );
  //      }
  //    });

  //   //  when app is running but in background
  //   messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });

  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });


  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });
  //   return unsubscribe

  // }, []);

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
      <Toast />
    </Provider>
  );
};

export default gestureHandlerRootHOC(App);
