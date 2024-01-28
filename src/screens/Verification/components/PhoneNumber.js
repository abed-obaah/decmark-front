import React, { useState, useEffect } from "react";
import { Keyboard,Text } from "react-native";
import AppButton from "@src/components/AppButton";
import PhoneNumberInput from "@src/components/PhoneNumberInput";
import { useNavigation } from "@react-navigation/native";
import useValidateLogin from "@src/screens/LogIn/hooks/useValidateLogin";
import useOnChange from "@src/hooks/forms/useOnChange";
import { useAppSelector, useAppDispatch } from "@src/hooks/useAppStore";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";




const apiKey = 'TL24THSrbgLpCFPH0Cibo7gnU2eT4uzUyQb29O7sHSpPUb5nMMdvTpG8nFnnTg';

const PhoneNumberScreen = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [timer, setTimer] = useState(0);
  const { t} = useTranslation();
  const navigation = useNavigation();
  const [isEmailVerified, setVerified] = useState("");
  const { inputs, handleChangeInput } = useOnChange({
    phoneNumber: "",
  });
  const { errors, handleError, hanleValidateLogin } = useValidateLogin(
    inputs,
    "phoneNumber"
  );
  
  // State to store the pin_id
  const [pinId, setPinId] = useState(null);
  const baseUrl = "https://api.decmark.com/v1/user";

  useEffect(() => {
    let interval;
    if (!isButtonActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsButtonActive(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, isButtonActive]);


  const handleVerifyUser = async () => {
    const userId = userInfo?.data?.id;
    Keyboard.dismiss();
    const valid = hanleValidateLogin();
    if (!valid && inputs.phoneNumber.trim() !== "") {
      setIsButtonActive(false);
      setTimer(60);
      axios
      .get(`${baseUrl}/auth/user/${userId}`,{
        headers:{
          Accept:"application/json",
          Authorization: `Bearer ${userInfo?.authentication.token}`,
        }
      }).then(async (res) => {
        const userDetails = res.data.data;
        console.log(userDetails.phone_verified_at)
        if(userDetails.phone_verified_at === null){
          // navigation.navigate("EmailOTPScreen", { email: inputs.email});
          // navigation.navigate("EmailOTPScreen", { isVerified: false });
          try {
            const response = await axios.post("https://api.ng.termii.com/api/sms/otp/send", {
                api_key: apiKey,
                message_type: "NUMERIC",
                to: "234" + inputs.phoneNumber,
                from: "N-Alert",
                channel: "Generic",
                pin_attempts: 10,
                pin_time_to_live: 5,
                pin_length: 6,
                pin_placeholder: "< 1234 >",
                message_text: "Your pin is < 1234 >",
                pin_type: "NUMERIC"
            });
            const pinId = response.data.pinId; // Extract the pinId from the response
            navigation.navigate("OTPScreen", { phoneNumber: "+234" + inputs.phoneNumber, pinId: pinId });
          } catch (error) {
            console.log("API Error:", error);
            // Handle the API error here
          }
        }else{
          navigation.navigate('VerifiedScreen')
        }
      })
      setVerified(userDetails.phone_verified_at);
      
    }
  };



  
  

  return (
    <>
      <PhoneNumberInput
        label={t('phoneNumber')}
        error={errors.phoneNumber}
        onFocus={() => handleError("phoneNumber", null)}
        onChangeText={(value) => handleChangeInput("phoneNumber", value)}
      />

      <AppButton label={t('next')} onPress={handleVerifyUser}
      disabled={!isButtonActive} 
       />
        {!isButtonActive && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Please wait for {timer} seconds
        </Text>
      )}
    </>
  );
};

export default PhoneNumberScreen;
