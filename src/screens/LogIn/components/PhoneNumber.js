import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';
import AppButton from '@components/AppButton'
import AppInput from '@components/AppInput'
import { useDispatch, useSelector } from 'react-redux';
import PhoneNumberInput from '@components/PhoneNumberInput';
import { useNavigation } from '@react-navigation/native';
import { LinkText } from '@components/AppText';
import useValidateLogin from '../hooks/useValidateLogin';
import useOnChange from '@hooks/forms/useOnChange';
import { loginUser, resetAuth } from '../../../redux/authSlice';

export default PhoneNumber = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.auth);
  const { inputs, handleChangeInput } = useOnChange({
    phoneNumber: '',
    password: ''
  });
  const { errors, handleError, hanleValidateLogin } = useValidateLogin(inputs, 'phoneNumber');

  useEffect(() => {
    if(success) {
      navigation.replace('BottomTabNavigator', { screen: 'HomeScreen' })
    }

    dispatch(resetAuth())
  }, [success])
  

  const handleLoginUser = () => {
    Keyboard.dismiss();
    const valid = hanleValidateLogin();
    const userData = {
      handle: '234' + inputs.phoneNumber,
	    password: inputs.password
    }
    if(valid) (
      dispatch(loginUser(userData))
    )
  }

  return (
    <>
      <PhoneNumberInput 
        label="Phone Number"
        error={errors.phoneNumber}
        onFocus={() => handleError("phoneNumber", null)}
        onChangeText={(value) => handleChangeInput('phoneNumber', value)}
      />
      <AppInput 
        label="Password"
        password
        error={errors.password}
        onFocus={() => handleError("password", null)}
        onChangeText={(value) => handleChangeInput('password', value)}
      />
      <LinkText 
        style={{ fontSize: 15, paddingTop: 2 }}
        onPress={() => navigation.navigate("ForgotPasswordScreen")}
      >Forgot password?</LinkText>
      <AppButton label="Login" onPress={handleLoginUser} />
    </>
  )
}