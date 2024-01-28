import React, { useState,useEffect } from "react";
import { AppSafeAreaView, AppScrollView } from "../../components/AppViews";
import { Alert, Keyboard, TouchableOpacity,Pressable, View } from "react-native";
import PageHeader from "@src/components/PageHeader";
import OTPField from "@src/components/OTPField";
import { LinkText, MediumText } from "@src/components/AppText";
import AppButton from "@src/components/AppButton";
import { SIZES } from "@src/constants/theme";
import axios from "axios";
// import Dialog from "react-native-popup-dialog";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";
import { useAppSelector, useAppDispatch } from "@src/hooks/useAppStore";




const apiKey = 'TL24THSrbgLpCFPH0Cibo7gnU2eT4uzUyQb29O7sHSpPUb5nMMdvTpG8nFnnTg';


const OTPScreen = ({ navigation, route }) => {
  const baseUrl = "https://api.decmark.com/v1/user";
  const phoneNumber = route.params?.phoneNumber || "";
  const pinId = route.params?.pinId || "";
  const { t} = useTranslation();
  const MAX_CODE_LENGTH = 6;
  const isVerified = route.params?.isVerified || false;

  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const dispatch = useAppDispatch();
const { userInfo } = useAppSelector((state) => state.auth);


  useEffect(() => {
    if (isVerified) {
      navigation.replace("Verified"); // Replace with your "You Have Been Verified" screen
    }
  }, [isVerified]);

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
        showToast()
      } catch (error) {
        console.log("API Error:", error);
        // Handle the API error here
        showToasts();
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



  const handleVerifyOtp = () => {
    const userId = userInfo?.data?.id;
    if (!pinId) {
      console.log("Pin ID is missing or invalid");
      return;
    }
  
    axios.post('https://api.ng.termii.com/api/sms/otp/verify', {
      api_key: apiKey,
      pin_id: pinId,
      pin: code
    })
    .then(async (response) => {
      console.log("Api Response:", response.data);
      if (response.status === 200) {
        // OTP Verified successfully
        alert("Your OTP has been verified successfully.");
  
        // Prepare the request body to update email_verified_at
        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const requestBody = {
          phone_verified_at: timestamp,
        };
  
        try {
          const userId = userInfo?.data?.id; // Ensure you have the userId
          console.log(timestamp)
          const updateResponse = await axios.put(`${baseUrl}/auth/phone/${userId}`, requestBody, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userInfo?.authentication.token}`,
            },
          });
  
          console.log("Update Response:", updateResponse.data);
          console.log(timestamp);
          // showToast();
          // After successful update, navigate to UploadScreen
          navigation.navigate("UploadScreen");
        } catch (err) {
          console.log("The error is:", err);
          console.log(timestamp);
          // showToasts();
        }
      }
    })
    .catch((error) => {
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
    </AppSafeAreaView>
  );
};

export default OTPScreen;
