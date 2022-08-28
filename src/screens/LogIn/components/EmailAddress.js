import React from 'react'
import AppButton from '@components/AppButton'
import AppInput from '@components/AppInput'
import { LinkText } from '@components/AppText';
import { useNavigation } from '@react-navigation/native';

export default EmailAddress = () => {
  const navigation = useNavigation()
  const [inputs, setInputs] = React.useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = React.useState({})

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

  return (
    <>
      <AppInput 
        label="Email"
        autoCapitalize="none"
        error={errors.email}
        onFocus={() => handleError(null, "email")}
        onChangeText={(value) => handleOnChange(value, 'email')}
      />
      <AppInput 
        label="Password"
        password
        error={errors.password}
        onFocus={() => handleError(null, "password")}
        onChangeText={(value) => handleOnChange(value, 'password')}
      />
      <LinkText 
        style={{ fontSize: 15, paddingTop: 2 }}
        onPress={() => navigation.navigate("ForgotPasswordScreen")}
      >Forgot password?</LinkText>
      <AppButton label="Login" onPress={handleValidate} />
    </>
  )
}