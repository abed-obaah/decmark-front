import React from "react";
import { Keyboard } from "react-native";
import AppButton from "@src/components/AppButton";
import AppInput from "@src/components/AppInput";
import { useNavigation } from "@react-navigation/native";
import useOnChange from "@src/hooks/forms/useOnChange";
import useValidateLogin from "@src/screens/LogIn/hooks/useValidateLogin";
import axios from "axios";


const apiKey = 'TL24THSrbgLpCFPH0Cibo7gnU2eT4uzUyQb29O7sHSpPUb5nMMdvTpG8nFnnTg';
export default EmailAddress = () => {
  const navigation = useNavigation();
  const { inputs, handleChangeInput } = useOnChange({
    email: "",
  });
  const { errors, handleError, hanleValidateLogin } = useValidateLogin(
    inputs,
    "email"
  );

  const handleVerifyUser = async () => {
    Keyboard.dismiss();
    const valid = hanleValidateLogin();
    const userData = {
      handle: inputs.email,
    };
    if (!valid && inputs.email.trim() !== "") {
      navigation.navigate("EmailOTPScreen",{ email: inputs.email });
      try{
        const response = await axios.post("https://api.ng.termii.com/api/email/otp/sends",{
           email_address: inputs.email,
            code:"092471",
            api_key: apiKey,
            email_configuration_id: "82918d29-5660-4fe5-969b-7ad7a49931e6"
        });
        console.log(response.data);
      }catch(error){
        console.log("APi Error:", error)
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
