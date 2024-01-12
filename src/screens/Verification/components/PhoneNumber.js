import React, { useState } from "react";
import { Keyboard } from "react-native";
import AppButton from "@src/components/AppButton";
import PhoneNumberInput from "@src/components/PhoneNumberInput";
import { useNavigation } from "@react-navigation/native";
import useValidateLogin from "@src/screens/LogIn/hooks/useValidateLogin";
import useOnChange from "@src/hooks/forms/useOnChange";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";




const apiKey = 'TL24THSrbgLpCFPH0Cibo7gnU2eT4uzUyQb29O7sHSpPUb5nMMdvTpG8nFnnTg';

const PhoneNumberScreen = () => {
  const { t} = useTranslation();
  const navigation = useNavigation();
  const { inputs, handleChangeInput } = useOnChange({
    phoneNumber: "",
  });
  const { errors, handleError, hanleValidateLogin } = useValidateLogin(
    inputs,
    "phoneNumber"
  );
  
  // State to store the pin_id
  const [pinId, setPinId] = useState(null);

  // const handleVerifyUser = () => {
  //   Keyboard.dismiss();
  //   const valid = hanleValidateLogin();
  //   if (!valid && inputs.phoneNumber.trim() !== "") {
  //     // Navigate to the OTP screen
  //     navigation.navigate("OTPScreen", { phoneNumber: "+234" + inputs.phoneNumber, pinId: pinId  });

  //     // Make the API request
  //     axios.post("https://api.ng.termii.com/api/sms/otp/send", {
  //       api_key: apiKey,
  //       message_type: "NUMERIC",
  //       to: "234" + inputs.phoneNumber,
  //       from: "N-Alert",
  //       channel: "Generic",
  //       pin_attempts: 10,
  //       pin_time_to_live: 5,
  //       pin_length: 6,
  //       pin_placeholder: "< 1234 >",
  //       message_text: "Your pin is < 1234 >",
  //       pin_type: "NUMERIC"
  //     })
  //     .then((response) => {
  //       console.log("API Response:", response.data);
  //       console.log("API Response:", response.data.pinId);
  //       // Set the pin_id in the state
  //       setPinId(response.data.pinId);
  //     })
  //     .catch((error) => {
  //       console.log("API Error:", error);
  //       // Handle the API error here
  //     });
  //   }
  // };

  const handleVerifyUser = async () => {
    Keyboard.dismiss();
    const valid = hanleValidateLogin();
    if (!valid && inputs.phoneNumber.trim() !== "") {
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

      <AppButton label={t('next')} onPress={handleVerifyUser} />
    </>
  );
};

export default PhoneNumberScreen;
