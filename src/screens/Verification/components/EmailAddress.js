import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import AppButton from "@src/components/AppButton";
import AppInput from "@src/components/AppInput";
import { useNavigation } from "@react-navigation/native";
import useOnChange from "@src/hooks/forms/useOnChange";
import useValidateLogin from "@src/screens/LogIn/hooks/useValidateLogin";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { useAppSelector, useAppDispatch } from "@src/hooks/useAppStore";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";


const apiKey = 'TL24THSrbgLpCFPH0Cibo7gnU2eT4uzUyQb29O7sHSpPUb5nMMdvTpG8nFnnTg';
export default EmailAddress = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { t} = useTranslation();
  const [isEmailVerified, setVerified] = useState("");

  const baseUrl = "https://api.decmark.com/v1/user";

  const { inputs, handleChangeInput } = useOnChange({
    email: "",
  });
  const { errors, handleError, hanleValidateLogin } = useValidateLogin(
    inputs,
    "email"
  );

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: `${t('otpSent')}`,
      text2: `${t('sentSuccess')}`
    });
  }

  const showToasts = () => {
    Toast.show({
      type: 'error',
      text1: `${t('otpSentError')}`,
      text2: `${t('sentError')}`
    });
  }

 const handleVerifyUser = async () => {
  const userId = userInfo?.data?.id;
  Keyboard.dismiss();
  const valid = hanleValidateLogin();
  const userData = {
    handle: inputs.email,
  };
  
  // Assuming userInfo is accessible in this scope
  if (inputs.email.trim() !== userInfo?.data?.email) {
    // If the input email doesn't match userInfo email, show an error
    alert("Enter the email belonging to this account");
    return; // Exit the function early
  }

  if (!valid && inputs.email.trim() !== "") {
    
    axios
    .get(`${baseUrl}/auth/user/${userId}`,{
      headers:{
        Accept:"application/json",
        Authorization: `Bearer ${userInfo?.authentication.token}`,
      }
    })
    .then(async (res) => {
      const userDetails = res.data.data;
      console.log(userDetails.email_verified_at)
      if(userDetails.email_verified_at === null){
        navigation.navigate("EmailOTPScreen", { email: inputs.email});
        // navigation.navigate("EmailOTPScreen", { isVerified: false });
        try {
          const response = await axios.post("https://api.ng.termii.com/api/email/otp/sends", {
            email_address: inputs.email,
            code: "092471",
            api_key: apiKey,
            email_configuration_id: "82918d29-5660-4fe5-969b-7ad7a49931e6"
          });
          showToast();
          console.log(response.data);
        } catch (error) {
          showToasts();
          // console.log("APi Error:", error)
        }
      }else{
        navigation.navigate('VerifiedScreen')
      }
    })
    .catch((err) => {
      alert("Error Validating user");
    })
    
    setVerified(userDetails.email_verified_at);
  }
};

  return (
    <>
      <AppInput
        label={t('email')}
        autoCapitalize="none"
        error={errors.email}
        onFocus={() => handleError("email", null)}
        onChangeText={(value) => handleChangeInput("email", value)}
      />
      <AppButton label={t('next')} onPress={handleVerifyUser} />
    </>
  );
};
