import React from 'react';
import { 
  StyleSheet,
  Platform,
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  NativeModules,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../../constants/theme';
import Icon from 'react-native-vector-icons/AntDesign';

const { StatusBarManager } = NativeModules;

export default SignUp = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={{ paddingHorizontal: 20, paddingVertical: 7 }}>
        <Icon
          name='arrowleft'
          style={{ 
            color: COLORS.grey,
            fontSize: 25,
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        style={{ paddingHorizontal: 20 }}
      >
        <Text 
          style={{
            fontSize: SIZES.xl,
            fontWeight: 'bold',
            color: COLORS.dark
          }}
        >Create Account</Text>
        <>
      <AppInput 
        label="Email"
        autoCapitalize="none"
      />
      <AppInput 
        label="Password"
        password
      />
      
      <AppInput />
      <AppButton label="Create Account" />
      
    </>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  },
})