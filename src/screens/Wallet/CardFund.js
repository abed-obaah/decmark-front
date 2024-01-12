import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
// import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";


const FundWalletScreen = () => {
  const { theme } = useAppTheme();

  const { t} = useTranslation();

  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState(0);
  const validateAmount = () => {
    if (amount) {
      setStage(1);
    }

  const pop = () => {
    alert("working");
  };

  return (
    <AppSafeAreaView>
      <PageHeader title={t('fundAccount')} />
      <AppScrollView>
        {stage === 0 ? (
          <>
            <AppInput
              label={t('amount')} 
              autoCapitalize="none"
              // error={errorAmount}
              // onFocus={() => handleError("email", null)}
              onChangeText={(value) => setAmount(value)}
            />
            <AppButton label={t('next')}  onPress={validateAmount} />
          </>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              <View style={{}}>
                <SmallText>{t('payment')}</SmallText>
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
                onPress={pop}
              >
                <MediumText style={{ color: "white" }}>{t('cancel')}</MediumText>
              </TouchableOpacity>
            </View>
            <CashMethod
              title={t('payCard')}
              details={t('payCardDetails')}
           
            />
            <QuickTeller
              title={t('payQuickTeller')}
              details={t('payQuickTellerDetails')}
            />
            <BankTransfer
              title={t('payBank')}
              details={t('payBankDetails')}
            />
            <PayWithQr
              title={t('payQr')}
              details={t('payQrDetails')}
            />
            <UssdMethod
              title={t('payUssd')}
              details={t('payUssdDetails')}
            />
            <BinanceMethod
              title={t('payBinance')}
              details={t('payBinanceDetails')}
            />
          </>
        )}
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default FundWalletScreen;

const styles = StyleSheet.create({});
