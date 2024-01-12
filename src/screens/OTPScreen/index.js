import React, { useState } from "react";
import { Pressable, Keyboard, View } from "react-native";
import AppButton from "@src/components/AppButton";
import OTPField from "@src/components/OTPField";
import { SIZES } from "@src/constants/theme";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import { MediumText, LinkText } from "@src/components/AppText";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";


export default OTPScreen = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const MAX_CODE_LENGTH = 5;
  const { t} = useTranslation();

  const handleVerifyOtp = () => {
    navigation.navigate("BottomTabNavigator", { screen: "HomeScreen" });
  };

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <Pressable onPress={Keyboard.dismiss}>
          <MediumText>{t('otpMessage')}</MediumText>
          <LinkText style={{ fontSize: SIZES.md, marginBottom: 10 }}>
            +2348141726099
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
          <MediumText>{t('VerifyText')} </MediumText>
          <LinkText
            style={{
              fontSize: SIZES.md,
            }}
          >
            {t('ResendCode')}
          </LinkText>
        </View>
      </AppScrollView>
    </AppSafeAreaView>
  );
};
