import React, { useState } from "react";
import { AppSafeAreaView, AppScrollView } from "../../components/AppViews";
import { Alert, Keyboard, Pressable, View } from "react-native";
import PageHeader from "@src/components/PageHeader";
import OTPField from "@src/components/OTPField";
import { LinkText, MediumText } from "@src/components/AppText";
import AppButton from "@src/components/AppButton";
import { SIZES } from "@src/constants/theme";
import axios from "axios";
// import Dialog from "react-native-popup-dialog";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";




const apiKey = 'TL24THSrbgLpCFPH0Cibo7gnU2eT4uzUyQb29O7sHSpPUb5nMMdvTpG8nFnnTg';

const OTPScreen = ({ navigation, route }) => {
  const phoneNumber = route.params?.phoneNumber || "";
  const pinId = route.params?.pinId || "";
  const { t} = useTranslation();
  const MAX_CODE_LENGTH = 6;

  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleVerifyOtp = () => {
    if (!pinId) {
      console.log("Pin ID is missing or invalid");
      return;
    }
    axios.post('https://api.ng.termii.com/api/sms/otp/verify',{
      api_key: apiKey,
      // pin_id: 'c95f77c8-95bb-4410-8ea1-e3c650bf2d43',
      pin_id: pinId,
      pin: code
    })
    .then((response) => {
      console.log("Api Response:", response.data);
      if (response.status === 200) {
        // Show alert for successful verification
        // setShowAlert(true);
        alert("Your OTP has been verified successfully.");
        navigation.navigate("UploadScreen");
      }
    })
    .catch((error) =>{
      console.log("API Error", error);
      // Handle the error as needed
    });
  };

  return (
    <AppSafeAreaView>
      <PageHeader title={t('VerificationCode')} />

      <AppScrollView style={{marginTop: 12}}>
        <Pressable onPress={Keyboard.dismiss}>
          <MediumText style={{ textAlign: "center", marginTop: 20 }}>
            {t('otpMessage')}
          </MediumText>
          <LinkText
            style={{
              fontSize: SIZES.md,
              marginBottom: 10,
              alignSelf: "center",
            }}
          >
            {phoneNumber}
          </LinkText>
          <OTPField
            code={code}
            setCode={setCode}
            setPinReady={setPinReady}
            maxLength={MAX_CODE_LENGTH}
          />
        </Pressable>
        <AppButton
          label={t('Verify')}
          disabled={!pinReady}
          onPress={handleVerifyOtp}
        />
        <View
          style={{
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <MediumText>{t('VerifyText')}</MediumText>
          <LinkText
            style={{
              fontSize: SIZES.md,
            }}
          >
            {t('ResendCode')}
          </LinkText>
        </View>
      </AppScrollView>
      {/* <Dialog.Container visible={showAlert}>
        <Dialog.Title>Verification Successful</Dialog.Title>
        <Dialog.Description>Your OTP has been verified successfully.</Dialog.Description>
        <Dialog.Button label="OK" onPress={() => setShowAlert(false)} />
      </Dialog.Container> */}
    </AppSafeAreaView>
  );
};

export default OTPScreen;
