import React from "react";
import { Keyboard } from "react-native";
import AppButton from "@src/components/AppButton";
import AppInput from "@src/components/AppInput";
import { useNavigation } from "@react-navigation/native";
import useOnChange from "@src/hooks/forms/useOnChange";
import useValidateLogin from "@src/screens/LogIn/hooks/useValidateLogin";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { useAppSelector, useAppDispatch } from "@src/hooks/useAppStore";



const apiKey = 'TL24THSrbgLpCFPH0Cibo7gnU2eT4uzUyQb29O7sHSpPUb5nMMdvTpG8nFnnTg';
export default EmailAddress = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);


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
      text1: 'OTP Sent',
      text2: 'Your OTP Has been sent successfully'
    });
  }

  const showToasts = () => {
    Toast.show({
      type: 'error',
      text1: 'OTP Error',
      text2: 'There was an error sending Your OTP'
    });
  }

 const handleVerifyUser = async () => {
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
    navigation.navigate("EmailOTPScreen", { email: inputs.email });
    try {
      const response = await axios.post("https://api.ng.termii.com/api/email/otp/send", {
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
  }
};

  return (
    <>
      <AppInput
        label="Email"
        autoCapitalize="none"
        error={errors.email}
        onFocus={() => handleError("email", null)}
        onChangeText={(value) => handleChangeInput("email", value)}
      />
      <AppButton label="Next" onPress={handleVerifyUser} />
    </>
  );
};
