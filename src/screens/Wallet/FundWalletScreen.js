import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React, { useState } from "react";
import PageHeader from "@src/components/PageHeader";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import AppInput from "@src/components/AppInput";
import AppButton from "@src/components/AppButton";
import { FlashList } from "@shopify/flash-list";
import { LargeText, MediumText, SmallText } from "@src/components/AppText";
import useAppTheme from "@src/hooks/useAppTheme";
import { SIZES } from "@src/constants/theme";
import CashMethod from "./components/CashMethod";
import QuickTeller from "./components/QuickTeller";
import BankTransfer from "./components/BankTransfer";
import PayWithQr from "./components/PayWithQr";
import UssdMethod from "./components/UssdMethod";
import BinanceMethod from "./components/BinanceMethod";
import PayWithCardScreen from "./PayWithCardScreen";
import { useNavigation } from "@react-navigation/native";
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";

const FundWalletScreen = () => {
  const { theme } = useAppTheme();

  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const { t} = useTranslation();

  const validateAmount = () => {
    if (amount) {
      setStage(1);
      const amount = amount
    }
  };


  const validate = () => {
    // setPaymentMethod(method);
    // setStage(2);
    alert('validate');
  };

  const goBack = () => {
    setStage(1);
  };
  

  return (
    <AppSafeAreaView>
      <PageHeader title={"Fund Account"} />
      <AppScrollView>
        {stage === 0 ? (
          <>
            <AppInput
              label={t('amount')}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(value) => setAmount(value)}
            />
            <AppButton label="Next" onPress={validateAmount} />
          </>
        ) : stage === 1 ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
                marginTop: 40,
              }}
            >
              <View style={{}}>
                <MediumText>{t('payment')}</MediumText>
                <LargeText>NGN {amount}</LargeText>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#d91d13",
                  borderRadius: SIZES.radius,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 20,
                }}
                onPress={() =>
                  navigation.navigate("ProfileStack", {
                    screen: "PayWithCardScreen",
                    params: {
                      amount: amount, // Pass 'amount' to the PayWithCardScreen
                    },
                  })
                }
              >
                <MediumText style={{ color: "white" }}>Cancel</MediumText>
              </TouchableOpacity>
            </View>
             <CashMethod
              title={t('payCard')}
              details={t('payCardDetails')}
              amount={amount} 
            />
            <QuickTeller
              title={t('payQuickTeller')}
              details={t('payQuickTellerDetails')}
              amount={amount} 
            />
            <BankTransfer
              title={t('payBank')}
              details={t('payBankDetails')}
              amount={amount} 
            />
            <PayWithQr
              title={t('payQr')}
              details={t('payQrDetails')}
              amount={amount} 
            />
            <UssdMethod
              title={t('payUssd')}
              details={t('payUssdDetails')}
              amount={amount} 
            />
            <BinanceMethod
              title={t('payBinance')}
              details={t('payBinanceDetails')}
              amount={amount} 
            />
          </>
        ) : (
          <PayWithCardScreen amount={amount} goBack={goBack} />
        )}
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default FundWalletScreen;

const styles = StyleSheet.create({});
