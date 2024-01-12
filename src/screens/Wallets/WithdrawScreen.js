import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState,useEffect } from "react";
import PageHeader from "@src/components/PageHeader";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import AppInput from "@src/components/AppInput";
import AppButton from "@src/components/AppButton";
import { FlashList } from "@shopify/flash-list";
import { LargeText, MediumText, SmallText } from "@src/components/AppText";
import useAppTheme from "@src/hooks/useAppTheme";
import { SIZES } from "@src/constants/theme";
import WithdrawAcc from "./components/WithdrawAcc";
import WithdrawQr from "./components/WithdrawQr";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";



const WithdrawScreen = () => {
  const { theme } = useAppTheme();

  const [amount, setAmount] = useState("");
  const [stage, setStage] = useState(0);
  const [walletData, setWalletData] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);




  useEffect(() => {
    fetchWallet(); // Fetch wallet data on component mount
  }, []);

  const fetchWallet = async () => {
    try {
      const userId = userInfo?.data?.id;

      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      const response = await axios.get(
        `https://api.decmark.com/v1/user/wallet?user_id=${userId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo?.authentication.token}`,
          },
        }
      );

      const data = response.data;
      setWalletData(data);
      console.log("wallet:", data)
    } catch (error) {
      console.error(error);
    }
  };



  const validateAmount = () => {
    const minimumWithdrawal = 100;
  
    if (parseFloat(amount) < minimumWithdrawal) {
      alert('Minimum withdrawal amount is 100 NGN');
    } else if (parseFloat(amount) > parseFloat(walletData?.amount?.amount || 0)) {
      alert('Insufficient funds to withdraw');
    } else {
      // Proceed to the next stage
      setStage(1);
    }
  };
  


  const show = () => {
    alert('show')
  };
  
  return (
    <AppSafeAreaView>
      <PageHeader title={"Withdraw Funds"} />
      <AppScrollView>
        {stage === 0 ? (
          <>
            <AppInput
              label="Amounts"
              autoCapitalize="none"
              keyboardType="numeric"
              // error={errorAmount}
              // onFocus={() => handleError("email", null)}
              onChangeText={(value) => setAmount(value)}
            />
            <View style={{}}>
                <SmallText>Balance</SmallText>
                <LargeText>NGN {walletData?.amount?.amount}</LargeText>
              </View>
            <AppButton label="Next" onPress={validateAmount} />
          </>
        ) : (
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
                <SmallText>You're Withdrawing</SmallText>
                <LargeText>NGN {amount}</LargeText>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  borderRadius: SIZES.radius,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 25,
                }}
                onPress={show}
              >
                <MediumText style={{ color: "white" }}>Cancel</MediumText>
              </TouchableOpacity>
            </View>
            <View>
                <WithdrawAcc
                  title="Withdraw to Accounts"
                  details="White listed bank accounts like Wema, UBA,
                  Zenith UBA, etc"
                  onPress={show}
                />
            </View>
           
            <WithdrawQr
              title="Withdraw with Qr Codes"
              details="White listed bank accounts like Wema, UBA,
              Zenith UBA, etc"
            />
          </>
        )}
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default WithdrawScreen;

const styles = StyleSheet.create({});
