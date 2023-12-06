import React, { useState } from "react";
import { AppSafeAreaView, AppScrollView } from "../components/AppViews";
import { Alert, Keyboard, Pressable, View } from "react-native";
import PageHeader from "@src/components/PageHeader";
import OTPField from "@src/components/OTPField";
import { LinkText, MediumText } from "@src/components/AppText";
import AppButton from "@src/components/AppButton";
import { SIZES } from "@src/constants/theme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";

const apiKey = 'TL24THSrbgLpCFPH0Cibo7gnU2eT4uzUyQb29O7sHSpPUb5nMMdvTpG8nFnnTg';

const CreatePinScreen = ({ navigation, route }) => {
  const phoneNumber = route.params?.phoneNumber || "";
  const pinId = route.params?.pinId || "";

  const MAX_CODE_LENGTH = 4;

  const [code, setCode] = useState("");
  const [pin, setPin] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);


  const savePin = async () => {
    
      try {
        const response = await axios.post(
          "https://api.decmark.com/v1/user/auth/pin/create",
          { pin },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userInfo?.authentication.token}`,
            },
          }
        );

        // Handle the response as needed
        console.log("PIN creation response:", response.data);
        alert("Pin created Successfull");
      } catch (error) {
        console.error("Error creating PIN:", error);
        // Handle the error
      }
  
  };

  return (
    <AppSafeAreaView>
      {/* <PageHeader title={"Set PIN code"} /> */}
      <AppScrollView style={{marginTop: 12}}>
        <Pressable onPress={Keyboard.dismiss}>
          <MediumText style={{ textAlign: "center", marginTop: 20 }}>
            This pin is used for transactions
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
            setPinReady={setPin}
            maxLength={MAX_CODE_LENGTH}
          />
        </Pressable>
        <AppButton
          label="Set Pin"
          disabled={!setPin}
          onPress={savePin}
        />
        
      </AppScrollView>
      {/* <Dialog.Container visible={showAlert}>
        <Dialog.Title>Verification Successful</Dialog.Title>
        <Dialog.Description>Your OTP has been verified successfully.</Dialog.Description>
        <Dialog.Button label="OK" onPress={() => setShowAlert(false)} />
      </Dialog.Container> */}
    </AppSafeAreaView>
  );
};

export default CreatePinScreen;
