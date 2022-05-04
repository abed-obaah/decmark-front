import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import EmailAddress from './components/EmailAddress';
import PhoneNumber from './components/PhoneNumber';
import { AppSafeAreaView, AppScrollView } from '../../components/AppViews';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/slices/themeSlice';
import { MediumText, LinkText } from '../../components/AppText';

export default LogIn = ({navigation}) => {
  const tabs = ['Email Address', 'Phone Number']
  const [activeTab, setActiveTab] = React.useState('Phone Number')

  const theme = useSelector(selectTheme)

  return (
    <AppSafeAreaView>
      <AppScrollView>
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
                    activeTab === item && { 
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
                  backgroundColor: activeTab === item ? theme.gold : 'transparent'
                }} 
              />
            </View>
          )}
        </View>
        <View>
          {activeTab === 'Email Address' ?
            <EmailAddress />
          :
            <PhoneNumber />
          }
          <MediumText
            style={{
              textAlign: 'center',
              paddingTop: 20,
            }}
            onPress={() => navigation.navigate("SignUp")}
          >
            New to DecMark?
            <LinkText> Create Account</LinkText>
          </MediumText>
        </View>
      </AppScrollView>
    </AppSafeAreaView>
  )
}