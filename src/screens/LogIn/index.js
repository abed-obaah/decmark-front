import React from 'react';
import { 
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import EmailAddress from './components/EmailAddress';
import PhoneNumber from './components/PhoneNumber';
import { AppSafeAreaView, AppScrollView } from '../../components/AppViews';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/slices/themeSlice';
import { LargeText, MediumText, LinkText } from '../../components/AppText';

export default LogIn = ({navigation}) => {
  const tabs = ['Email Address', 'Phone Number']
  const [atciveTab, setActiveTab] = React.useState('Phone Number')

  const theme = useSelector(selectTheme)

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <LargeText>Account Login</LargeText>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15
        }}>
          {tabs.map(item => 
            <View key={item} style={{ position: 'relative' }}>
              <TouchableOpacity onPress={() => setActiveTab(item)}>
                <MediumText 
                  style={[
                    { 
                      fontWeight: 'bold',
                      paddingVertical: 10,
                      marginVertical: 10
                    }, 
                    atciveTab === item && { 
                      color: theme.PRIMARY_TEXT_COLOR, 
                    }
                  ]} 
                  
                >
                  {item}
                </MediumText>
              </TouchableOpacity>
              <View 
                style={{
                  position: 'absolute',
                  bottom: 10,
                  width: '70%',
                  height: 4,
                  backgroundColor: atciveTab === item ? theme.gold : 'transparent'
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
          <LinkText style={styles.text}>Forgot password?</LinkText>
          <LinkText style={styles.text} onPress={() => navigation.navigate("SignUp")}>New to DecMark? Create account</LinkText>
        </View>
      </AppScrollView>
    </AppSafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'right',
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 20,
  },
})