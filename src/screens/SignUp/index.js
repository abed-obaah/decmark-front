import React from 'react';
import { View } from 'react-native';
import { SIZES } from '../../constants/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/slices/themeSlice';
import { AppSafeAreaView, AppScrollView } from '../../components/AppViews';
import { LargeText, MediumText, LinkText, SmallText } from '../../components/AppText';

export default SignUp = ({ }) => {
  const [toggleReferralID, setToggleReferralID] = React.useState(false)

  const theme = useSelector(selectTheme)

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <LargeText>Create Account</LargeText>
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
              paddingVertical: 2.5,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <MediumText onPress={() => setToggleReferralID(!toggleReferralID)}>Referral ID (Optional)</MediumText>
            <Icon
              name={toggleReferralID ? "caretup" : "caretdown"}
              style={{ 
                color: theme.SECONDARY_TEXT_COLOR,
                fontSize: 13.5,
                marginLeft: 3.5
              }}
              onPress={() => setToggleReferralID(!toggleReferralID)}
            />
          </View>
          {toggleReferralID &&
            <AppInput marginTop={5} />
          }
        </View>

        <AppButton label="Submit" />

        <SmallText style={{ marginVertical: 10, textAlign: 'center', paddingTop: 5 }}>
          By creating an account, you agree to our 
          <LinkText> Terms and Conditions</LinkText> and 
          <LinkText> Policy.</LinkText>
        </SmallText>
      </AppScrollView>
    </AppSafeAreaView>
  )
}