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
import EmailAddress from './components/EmailAddress';
import PhoneNumber from './components/PhoneNumber';

const { StatusBarManager } = NativeModules;

export default LogIn = ({navigation}) => {
  const tabs = ['Email Address', 'Phone Number']
  const [atciveTab, setActiveTab] = React.useState('Email Address')

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
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
            <EmailAddress />
          :
            <PhoneNumber />
          }
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