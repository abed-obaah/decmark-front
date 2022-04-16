import React from 'react';
import AppButton from '../../../components/AppButton'
import AppInput from '../../../components/AppInput'

export default PhoneNumber = () => {
  const [inputs, setInputs] = React.useState({
    phoneNumber: '',
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

    if(!inputs.phoneNumber) {
      handleError("Please enter your phone number", "phoneNumber")
      valid = false
    }
    if(!inputs.password) {
      handleError("Please enter your password", "password")
      valid = false
    }

    if(valid) (
      handleLogin()
    )
  }

  const handleLogin = () => {}

  return (
    <>
      <AppInput 
        label="Phone Number"
        keyboardType="numeric"
        error={errors.phoneNumber}
        onFocus={() => handleError(null, "phoneNumber")}
        onChangeText={(value) => handleOnChange(value, 'phoneNumber')}
      />
      <AppInput 
        label="Password"
        password
        error={errors.password}
        onFocus={() => handleError(null, "password")}
        onChangeText={(value) => handleOnChange(value, 'password')}
      />
      <AppButton label="Login" onPress={handleValidate} />
    </>
  )
}