import React from 'react'
import { AppSafeAreaView, AppScrollView } from '../../components/AppViews';
import { LargeText, MediumText, LinkText, SmallText } from '../../components/AppText';
import PhoneNumberInput from '../../components/PhoneNumberInput'

export default SignUp = ({ navigation }) => {

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <LargeText>Welcome to DecMark!</LargeText>
        <MediumText style={{ paddingVertical: 10 }}>Before we proceed, please enter your active mobile number.</MediumText>
        <PhoneNumberInput />
        <AppButton label='Confirm' onPress={() => navigation.navigate("SignUpWithNumber")} />
        <MediumText style={{ paddingVertical: 10 }}>or sign up with</MediumText>
      </AppScrollView>
      <SmallText style={{ marginBottom: 35, textAlign: 'center', paddingTop: 5, paddingHorizontal: 20 }}>
        By creating an account, you agree to our 
        <LinkText> Terms and Conditions</LinkText> and 
        <LinkText> Policy.</LinkText>
      </SmallText>
    </AppSafeAreaView>
  )
}