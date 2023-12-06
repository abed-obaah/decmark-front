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

const apiKey = 'TL24THSrbgLpCFPH0Cibo7gnU2eT4uzUyQb29O7sHSpPUb5nMMdvTpG8nFnnTg';

const EmailOTPScreen = ({ navigation, route }) => {
  const phoneNumber = route.params?.phoneNumber || "";
  const pinId = route.params?.pinId || "";
  const email = route.params?.email || "";

  const MAX_CODE_LENGTH = 6;

  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // add email otp verification
  const handleVerifyOtp = () => {
    
    if (code === "092471" && email === route.params.email) {
        // Codes match and email matches the input email
        alert("Your OTP has been verified successfully.");
        navigation.navigate("UploadScreen");
      } else {
        alert("Invalid OTP or email.");
      }
  };
  return (
    <AppSafeAreaView>
      <PageHeader title={"Verification Code"} />

      <AppScrollView style={{marginTop: 12}}>
        <Pressable onPress={Keyboard.dismiss}>
          <MediumText style={{ textAlign: "center", marginTop: 20 }}>
            We have sent a code to your mobile number
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
          label="Verifys"
          disabled={!pinReady}
          onPress={handleVerifyOtp}
        />
        <View
          style={{
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <MediumText>Didn't receive a text?</MediumText>
          <LinkText
            style={{
              fontSize: SIZES.md,
            }}
          >
            Resend code
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
