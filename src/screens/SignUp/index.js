import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { AppSafeAreaView, AppScrollView } from '../../components/AppViews';
import { LargeText, MediumText, LinkText, SmallText } from '../../components/AppText';
import PhoneNumberInput from '../../components/PhoneNumberInput'
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/slices/themeSlice';
import { SIZES } from '../../constants/theme';

export default SignUp = ({ navigation }) => {
  const theme = useSelector(selectTheme)

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <LargeText>Welcome to DecMark!</LargeText>
        <MediumText style={{ paddingVertical: 10 }}>Before we proceed, please enter your active mobile number.</MediumText>
        <PhoneNumberInput />
        <AppButton label='Confirm' onPress={() => navigation.navigate("SignUpWithNumber")} />

        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <View style={[styles.line, {backgroundColor: theme.PRIMARY_BORDER_COLOR}]} />
          <MediumText style={{ textAlign: 'center', paddingHorizontal: 10,}}>or sign up with</MediumText>
          <View style={[styles.line, {backgroundColor: theme.PRIMARY_BORDER_COLOR}]} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 25 }}>
          <View 
            style={[styles.imgContainer, { backgroundColor: theme.PRIMARY_BORDER_COLOR }]}
          >
            <Image 
              source={require("../../assets/images/google-logo.png")} 
              style={styles.img}
            />
          </View>
          <View style={{ marginHorizontal: 7.5 }} />
          <View 
            style={[styles.imgContainer, { backgroundColor: theme.PRIMARY_BORDER_COLOR }]}
          >
            <Image 
              source={require("../../assets/images/facebook-logo.png")} 
              style={styles.img}
            />
          </View>
        </View>
        <SmallText style={{ marginBottom: 35, textAlign: 'center', marginTop: 25, paddingHorizontal: 20 }}>
          By creating an account, you agree to our 
          <LinkText> Terms and Conditions</LinkText> and 
          <LinkText> Policy.</LinkText>
        </SmallText>
      </AppScrollView>
    </AppSafeAreaView>
  )
}

const styles = StyleSheet.create({
  line: {
    flex: 1, 
    height: 1,
  },
  imgContainer: {
    paddingTop: 0,
    width: 50,
    height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: SIZES.rounded
  },
  img: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  }
})
