import React, { useState } from 'react'
import AppButton from '../../../components/AppButton'
import AppInput from '../../../components/AppInput'
import { View } from 'react-native'
import { SIZES } from '../../../constants/theme'
import { AntDesign } from '@expo/vector-icons';
import { MediumText } from '../../../components/AppText'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../../../redux/authSlice'

export default IndividualFields = ({ theme, toggleReferralID, setToggleReferralID, phoneNumber }) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    first_name: "",
		last_name: "",
		email: "",
		phone: phoneNumber,
		password: "",
		password_confirmation: "",
		accept_terms: true
  });
  const [errors, setErrors] = useState({})

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

  const handleRegisterUser = () => {
    // dispatch(registerUser())
    console.log(inputs)
  }

  return (
    <>
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
          <AntDesign
            name={toggleReferralID ? "caretdown" : "caretright"}
            style={{ 
              color: theme.SECONDARY_TEXT_COLOR,
              fontSize: 13.5,
              marginRight: 3.5
            }}
            onPress={() => setToggleReferralID(!toggleReferralID)}
          />
          <MediumText onPress={() => setToggleReferralID(!toggleReferralID)}>Referral ID (Optional)</MediumText>
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