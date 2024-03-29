
import React, { useState, useEffect } from "react";
import { AppSafeAreaView, AppScrollView } from "../../components/AppViews";
import { Alert, Keyboard, TouchableOpacity,Pressable, View } from "react-native";
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
// import { useVerification } from '../context/VerificationContext';



const apiKey = 'TL24THSrbgLpCFPH0Cibo7gnU2eT4uzUyQb29O7sHSpPUb5nMMdvTpG8nFnnTg';

const EmailOTPScreen = ({ navigation, route }) => {
const phoneNumber = route.params?.phoneNumber || "";
const pinId = route.params?.pinId || "";
const email = route.params?.email || "";
// const { setIsOtpVerified } = useVerification();
const isVerified = route.params?.isVerified || false;

const dispatch = useAppDispatch();
const { userInfo } = useAppSelector((state) => state.auth);
const { t} = useTranslation();
const MAX_CODE_LENGTH = 6;

const [code, setCode] = useState("");
const [pinReady, setPinReady] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const [isResendDisabled, setIsResendDisabled] = useState(true);
const [countdown, setCountdown] = useState(60);

const baseUrl = "https://api.decmark.com/v1/user";



useEffect(() => {
  let timerId;

  if (isResendDisabled) {
    timerId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timerId);
          setIsResendDisabled(false); // Enable the Resend link
          return 0; // Reset the countdown
        }
        return prevCountdown - 1;
      });
    }, 1000);
  }

  return () => clearInterval(timerId);
}, [isResendDisabled]);

const handleResendCode = async () => {
  if (!isResendDisabled) {
    setIsResendDisabled(true);
    setCountdown(60); // Restart the countdown

    try {
      const response = await axios.post("https://api.ng.termii.com/api/email/otp/send", {
        email_address: email, // Use the email from the state or props
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

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'OTP Verified',
    text2: 'Your OTP has been sent successfully.'
  });
}
const showToasts = () => {
  Toast.show({
    type: 'error',
    text1: 'OTP ERROR',
    text2: 'Invalid OTP or email.'
  });
}

// check if the users email is verified if not go to the otp page else to the verified page

const [isEmailVerified, setVerified] = useState("");


useEffect(() => {
  const userId = userInfo?.data?.id;
  // Fetch user details when the component mounts
  axios
    .get(`${baseUrl}/auth/user/${userId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userInfo?.authentication.token}`,
      },
    })
    .then((res) => {
      const userDetails = res.data.data;
      console.log(userDetails.email_verified_at)

      // Check if email_verified_at is null
    if (userDetails.email_verified_at === null) {
      // Navigate to EmailOTPScreen
      
      navigation.navigate('EmailOTPScreen');
    } else {
      // Navigate to VerifiedScreen
      navigation.navigate('VerifiedScreen');
    }
      
      setVerified(userDetails.email_verified_at);
     
      
      
    })
    .catch((err) => {
     
      alert("Error fetching user details:");
    });
}, []);

// add email otp verification
const handleVerifyOtp = async () => {
  const userId = userInfo?.data?.id;
  if (code === "092471" && email === (route.params?.email || "")) {
    showToast();
    navigation.navigate("UploadScreen", { isVerified: true });

    const timestamp = new Date().toISOString();

    const requestBody = {
      email_verified_at: timestamp,
    };

    
    axios
    .put(`${baseUrl}/auth/email/${userId}`, requestBody, { // Use the updated route URL
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userInfo?.authentication.token}`,
      },
    })
    .then((res) => {
      console.log("Response:", res.data);
      console.log(timestamp);
      showToast();
    })
    .catch((err) => {
      console.log("The error is:", err.response);
      showToasts();
    });
  } else {
    showToasts();
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
        <TouchableOpacity
        onPress={handleResendCode}
        disabled={isResendDisabled}
      >
        <LinkText
          style={{
            fontSize: SIZES.md,
            color: isResendDisabled ? 'gray' : 'blue', // Change color based on isResendDisabled
          }}
        >
          {isResendDisabled ? `${t('ResendCode')} (${countdown})` : t('ResendCode')}
        </LinkText>
      </TouchableOpacity>
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
