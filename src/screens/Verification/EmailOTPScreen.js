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
import Toast from 'react-native-toast-message';
import { useAppSelector, useAppDispatch } from "@src/hooks/useAppStore";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";


const apiKey = 'TL24THSrbgLpCFPH0Cibo7gnU2eT4uzUyQb29O7sHSpPUb5nMMdvTpG8nFnnTg';

const EmailOTPScreen = ({ navigation, route }) => {
  const phoneNumber = route.params?.phoneNumber || "";
  const pinId = route.params?.pinId || "";
  const email = route.params?.email || "";
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { t} = useTranslation();
  const MAX_CODE_LENGTH = 6;

  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'OTP Verified',
      text2: 'Your OTP has been verified successfully.'
    });
  }
  const showToasts = () => {
    Toast.show({
      type: 'success',
      text1: 'OTP ERROR',
      text2: 'Invalid OTP or email.'
    });
  }

  // add email otp verification
  const handleVerifyOtp = () => {
    
    if (code === "092471" && email === route.params.email) {
        // Codes match and email matches the input email
        showToast();
        navigation.navigate("UploadScreen");
      } else {
        showToasts();
        // alert("Invalid OTP or email.");
      }
  };
  return (
    <AppSafeAreaView>
      <PageHeader title={t('VerificationCode')} />

      <AppScrollView style={{marginTop: 12}}>
        <Pressable onPress={Keyboard.dismiss}>
          <MediumText style={{ textAlign: "center", marginTop: 20 }}>
          {t('otpMessageEmail')}
          </MediumText>
          <LinkText
            style={{
              fontSize: SIZES.md,
              marginBottom: 10,
              alignSelf: "center",
            }}
          >
            {email}
          </LinkText>
          <OTPField
            code={code}
            setCode={setCode}
            setPinReady={setPinReady}
            maxLength={MAX_CODE_LENGTH}
          />
        </Pressable>
        <AppButton
          label="Verify"
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

export default EmailOTPScreen;
