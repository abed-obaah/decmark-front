import React from 'react';
import { 
  StyleSheet,
  Platform,
  Text, 
  View,
  Image,
  SafeAreaView,
  ScrollView,
  NativeModules,
  useWindowDimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../../constants/theme';
import AppButton from '../../components/AppButton';

const { StatusBarManager } = NativeModules;

export default WelcomeScreen = ({navigation}) => {
  const { height, width } = useWindowDimensions()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
      >
        <View style={{ alignItems: 'center' }}>
          <Image 
            source={require("../assets/images/adaptive-icon.png")} 
            style={{
              height: height * .35,
              width,
              resizeMode: 'contain',
              marginBottom: 5
            }}
          />
        </View>
        <Text style={{ fontSize: SIZES.lg, fontWeight: 'bold', color: COLORS.dark }}>Welcome to DecMark!</Text>
        <Text style={{ fontSize: SIZES.md, color: COLORS.grey }}>It will only take you couple of minutes to get started.</Text>
        <AppButton label='Create Account' onPress={() => navigation.navigate("SignUp")} />
        <AppButton label='Login' background='transparent' marginTop={10} onPress={() => navigation.navigate("LogIn")} />
        
      </ScrollView>
      <Text style={{ marginBottom: 35, textAlign: 'center', color: COLORS.grey, paddingTop: 5 }}>
        By creating an account, you agree to our 
        <Text style={{ color: COLORS.darkGold }}> Terms and Conditions</Text> and 
        <Text style={{ color: COLORS.darkGold }}> Policy.</Text>
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  }
})