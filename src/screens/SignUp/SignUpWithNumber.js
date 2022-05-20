import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import { AppSafeAreaView, AppScrollView } from '../../components/AppViews';
import { MediumText, LinkText } from '../../components/AppText';
import IndividualFields from './components/IndividualFields';
import CompanyFields from './components/CompanyFields';
import useTheme from '../../hooks/useTheme';
import { useHeaderHeight } from '@react-navigation/elements';

export default SignUpWithNumber = () => {
  const [theme] = useTheme()
  const headerHeight = useHeaderHeight();
  
  const [toggleReferralID, setToggleReferralID] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('Personal Account')

  return (
    <AppSafeAreaView>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>

      {['Personal Account', 'Company Account'].map(item => 
        <View key={item} style={{ position: 'relative', paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => setActiveTab(item)}>
            <MediumText 
              style={[
                { 
                  fontWeight: 'bold',
                  paddingVertical: 10,
                  marginBottom: 5
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
              marginLeft: 20,
              backgroundColor: activeTab === item ? theme.gold : 'transparent'
            }} 
          />
        </View>
      )}
      </View>
      <AppScrollView>
        <MediumText style={{ marginTop: 5 }}>Verified: <LinkText>+2348141726099</LinkText></MediumText>
        {activeTab === 'Personal Account' ?
            <IndividualFields 
              theme={theme}
              toggleReferralID={toggleReferralID}
              setToggleReferralID={setToggleReferralID} 
            />
          :
            <CompanyFields
              theme={theme}
              toggleReferralID={toggleReferralID}
              setToggleReferralID={setToggleReferralID} 
            />
        }
      </AppScrollView>
    </AppSafeAreaView>
  )
}