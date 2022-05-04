import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import { AppSafeAreaView, AppScrollView } from '../../components/AppViews';
import { MediumText } from '../../components/AppText';
import IndividualFields from './components/IndividualFields';
import CompanyFields from './components/CompanyFields';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/slices/themeSlice';

export default SignUpWithNumber = ({ }) => {
  const theme = useSelector(selectTheme)
  
  const [toggleReferralID, setToggleReferralID] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('Personal Account')

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <MediumText style={{ marginTop: 5 }}>Verified mobile number +2348141726099</MediumText>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15
        }}>

        {['Personal Account', 'Company Account'].map(item => 
          <View key={item} style={{ position: 'relative' }}>
            <TouchableOpacity onPress={() => setActiveTab(item)}>
              <MediumText 
                style={[
                  { 
                    fontWeight: 'bold',
                    paddingVertical: 10,
                    marginVertical: 5
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