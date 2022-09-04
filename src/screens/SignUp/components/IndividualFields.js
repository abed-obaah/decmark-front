import React, { useEffect } from 'react'
import AppButton from '@components/AppButton'
import AppInput from '@components/AppInput'
import { View } from 'react-native'
import { SIZES } from '@constants/theme'
import { AntDesign } from '@expo/vector-icons';
import { MediumText } from '@components/AppText'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '@redux/authSlice';
import { useNavigation } from '@react-navigation/native';
import useOnChange from '@hooks/forms/useOnChange';
import { resetAuth } from '@redux/authSlice';

export default IndividualFields = ({ theme, toggleReferralID, setToggleReferralID, phoneNumber }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.auth);
  const { inputs, errors, handleError, handleChangeInput, handleValidateForm } = useOnChange({
    first_name: "",
		last_name: "",
		email: "",
		phone: "234" + phoneNumber,
		password: "",
		accept_terms: true
  });

  useEffect(() => {
    if(success) {
      navigation.navigate("LogIn")
    }

    dispatch(resetAuth())
  }, [success, navigation, dispatch])
  

  const handleRegisterUser = () => {
    const valid = handleValidateForm();
    if(valid) (
      dispatch(registerUser(inputs))
    )
  }

  return (
    <>
      <AppInput 
        label="First Name"
        error={errors.first_name}
        onFocus={() => handleError("first_name", null)}
        onChangeText={(value) => handleChangeInput('first_name', value)}
      />
      <AppInput 
        label="Last Name"
        error={errors.last_name}
        onFocus={() => handleError("last_name", null)}
        onChangeText={(value) => handleChangeInput('last_name', value)}
      />
      <AppInput 
        label="Email"
        autoCapitalize='none'
        error={errors.email}
        onFocus={() => handleError("email", null)}
        onChangeText={(value) => handleChangeInput('email', value)}
      />
      <AppInput 
        label="Password"
        password
        error={errors.password}
        onFocus={() => handleError(null, "password")}
        onChangeText={(value) => handleChangeInput('password', value)}
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
          <AntDesign
            name={toggleReferralID ? "caretdown" : "caretright"}
            style={{ 
              color: theme.PRIMARY_TEXT_COLOR,
              fontSize: 13.5,
              marginRight: 3.5
            }}
            onPress={() => setToggleReferralID(!toggleReferralID)}
          />
          <MediumText style={{ color: theme.PRIMARY_TEXT_COLOR }} onPress={() => setToggleReferralID(!toggleReferralID)}>Referral ID (Optional)</MediumText>
        </View>
        {toggleReferralID &&
          <AppInput marginTop={5} />
        }
      </View>

      <AppButton 
        label="Submit"
        onPress={handleRegisterUser}
      />
    </>
  )
}