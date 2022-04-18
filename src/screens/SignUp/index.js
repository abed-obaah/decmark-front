import React from 'react';
import { 
  StyleSheet,
  Platform,
  Text, 
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  NativeModules,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SIZES } from '../../constants/theme';
import GoBackNavigation from '../../navigation/GoBackNavigation';
import Icon from 'react-native-vector-icons/AntDesign';

const { StatusBarManager } = NativeModules;

export default SignUp = ({navigation}) => {
  const [toggleReferralID, setToggleReferralID] = React.useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <GoBackNavigation>
        <Text 
          style={{
            color: COLORS.grey,
            fontSize: SIZES.md
          }}
          onPress={() => navigation.navigate('LogIn')}
        >Login</Text>
      </GoBackNavigation>
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
        <AppInput 
          label="First Name"
        />
        <AppInput 
          label="Last Name"
        />
        <AppInput 
          label="Email"
          autoCapitalize='none'
        />
        <AppInput 
          label="Password"
          password
        />
        
        <View style={{ marginTop: 20 }}>
          <View 
            style={{
              fontSize: SIZES.md,
              color: COLORS.grey,
              marginBottom: 2.5,
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Text 
              style={{
                fontSize: SIZES.md,
                color: COLORS.grey,
              }}
              onPress={() => setToggleReferralID(!toggleReferralID)}
            >Referral ID (Optional)</Text>
            <Icon
              name={toggleReferralID ? "caretup" : "caretdown"}
              style={{ 
                color: COLORS.lightGrey,
                fontSize: 13.5,
                marginLeft: 3.5
              }}
              onPress={() => setToggleReferralID(!toggleReferralID)}
            />
          </View>
          {toggleReferralID &&
            <View style={styles.inputContainer}>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: SIZES.md,
                  fontWeight: 'bold'
                }}
              />
            </View>
          }
        </View>

        <AppButton label="Sign Up" />

        <Text style={{ marginVertical: 10, textAlign: 'center', color: COLORS.grey, paddingTop: 5 }}>
          By creating an account, you agree to our 
          <Text style={{ color: COLORS.darkGold }}> Terms and Conditions</Text> and 
          <Text style={{ color: COLORS.darkGold }}> Policy.</Text>
        </Text>
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
  inputContainer: {
    height: 50,
    backgroundColor: COLORS.lighter,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.light,
    borderRadius: SIZES.radius,
    alignItems: 'center'
  }
})