import React from 'react';
import { 
  StyleSheet,
  Platform,
  Text, 
  View,
  Dimensions,
  NativeModules 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../../constants/theme';

const { height } = Dimensions.get("window")
const { StatusBarManager } = NativeModules;

const LogIn = () => {
  return (
    <View style={[styles.container, { height }]}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Account Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  },
  title: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.dark
  }
})

export default LogIn;
