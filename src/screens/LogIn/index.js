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
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

const { StatusBarManager } = NativeModules;

export default LogIn = ({navigation}) => {
  const tabs = ['Email Address', 'Phone Number']
  const [atciveTab, setActiveTab] = React.useState('Email Address')

  const [inputs, setInputs] = React.useState({
    email: '',
    phoneNumber: '',
    password: ''
  })
  const [errors, setErrors] = React.useState({})

  const handleOnChange = (value, input) => {
    setInputs((prevState) => ({
      ...prevState,
      [input]: value
    }))
  }

  const handleError = (errMsg, input) => {
    setErrors((prevState) => ({
      ...prevState,
      [input]: errMsg
    }))
  }

  const handleValidate = () => {
    let valid = true
    if(!inputs.email) {
      handleError("Please enter your email", "email")
      valid = false
    } else if(!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please enter a valid email address", "email")
    }

    if(!inputs.password) {
      handleError("Please enter your password", "password")
    }

    if(valid) (
      handleLogin()
    )
  }

  const handleLogin = () => {}

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <StatusBar style="dark" />
        <Text 
          style={{
            fontSize: SIZES.xl,
            fontWeight: 'bold',
            color: COLORS.dark
          }}
        >Account Login</Text>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15
        }}>
          {tabs.map(item => 
            <View key={item} style={{ position: 'relative' }}>
              <Text 
                style={[
                  styles.tab, 
                  atciveTab === item && { 
                    color: COLORS.dark, 
                  }
                ]} 
                onPress={() => setActiveTab(item)}
              >
                {item}
              </Text>
              <View 
                style={{
                  position: 'absolute',
                  bottom: 10,
                  width: '70%',
                  height: 4,
                  backgroundColor: atciveTab === item ? COLORS.primary : 'white'
                }} 
              />
            </View>
          )}
        </View>
        <View>
          {atciveTab === 'Email Address' ?
            <AppInput 
              label="Email"
              error={errors.email}
              onFocus={() => handleError(null, "email")}
              onChangeText={(value) => handleOnChange(value, 'email')}
            />
          :
            <AppInput 
              label="Phone Number"
              keyboardType="numeric"
              onChangeText={(value) => handleOnChange(value, 'phoneNumber')}
            />
          }
          <AppInput 
            label="Password"
            password
            error={errors.password}
            onFocus={() => handleError(null, "password")}
            onChangeText={(value) => handleOnChange(value, 'password')}
          />
          <AppButton label="Login" onPress={handleValidate} />
          <Text style={styles.text}>Forgot password?</Text>
          <Text style={styles.text} onPress={() => navigation.navigate("SignUp")}>New to DecMark? Create account</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT + 20 : 0,
  },
  tab: {
    color: COLORS.grey,
    fontWeight: 'bold',
    fontSize: SIZES.md,
    paddingVertical: 10,
    marginVertical: 10,
  },
  text: {
    color: COLORS.darkGold,
    textAlign: 'right',
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 20,
  },
})