import React, { useState,useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
} from 'react-native';
import PageHeader from "@src/components/PageHeader";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import { MediumText, LargeText } from "@src/components/AppText";
import AppButton from '@src/components/AppButton';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";


const PayWithCardScreen = ({ route }) => {
  const { amount: initialAmount } = route.params;

  // Log the received initialAmount to check if it's received correctly
  console.log("Initial Amount:", initialAmount);
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [amount, setAmount] = useState(initialAmount || '');
  const [card, setCardNumber] = useState(""); // Store card input as a string
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>(); 
  const { userInfo } = useSelector((state) => state.auth);
  const { t} = useTranslation();

  const validateAmount = () => {
    if (amount) {
      // setStage(1);
    }
  };

  // for card topup its not working dont bother
  const handlePayment = async () => {
    const userId = userInfo?.data?.id;
    console.log(card);
    // Convert the card input to a UUID
    const cardUUID = convertToUUID(card);

    const topUpData = {
      cvv,
      expiry,
      amount, // Use the entered amount here
      card: cardUUID,
    };

    console.log("topup data:", topUpData);

    const response = await axios.post(
      'https://api.decmark.com/v1/user/wallet/topup/card',
      topUpData,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.authentication.token}`,
        },
      })
      .then((res) => {
        console.log("Response:", res.data);
      })
      .catch((err) => {
        console.log("The error is:", err.response);
      });
  };

  // Helper function to convert the input to a UUID
  const convertToUUID = (input) => {
    // Add your logic here to convert the input to a UUID.
    // You may use uuidv4() for this purpose.
    // For example:
    return uuidv4();
  };

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <View style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
          <MediumText>{t('payment')}</MediumText>
          <LargeText>NGN {amount}</LargeText>
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>{t('amount')}</Text>
          <TextInput
            style={styles.input}
            value={amount}
            placeholder={t('enterAmount')}
            onChangeText={(value) => setAmount(value)}
            editable={false} 
          />

          <Text style={styles.label}>{t('billing')}</Text>
          <TextInput
            style={styles.input}
            value={card}
            placeholder="@jondoe.com"
            onChangeText={(value) => setCardNumber(value)}
          />

          
          <Paystack
        // paystackKey="pk_live_897d77bf82968eb17c2eaf5972dbc8fcfe7bbe45"
        paystackKey="pk_test_d55e2c5ae69892961f5a7a21ef34628960cbd0ff"
        billingEmail={card}
        amount={amount.toString()}
        // CVV={cvv} // Pass cvv dynamically
        // expiry={expiry}
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        ref={paystackWebViewRef}
      />

          <AppButton
            label={`Pay NGN ${amount}`}
            marginTop={0.5}
            buttonHeight={40}
            onPress={()=> paystackWebViewRef.current.startTransaction()}
          />
        </View>
      </AppScrollView>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    textAlign: 'left',
    alignSelf: 'stretch',
    marginBottom: 5,
  },
  input: {
    flex: 1,
    height: 40,
    width: '100%',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    caretColor: 'gold', // Add this line to change the cursor color
  },
  grayBorder: {
    borderColor: 'gray',
    height: 40,
  },
  datePickerContainer: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 100,
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  mediumText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#172b43',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default PayWithCardScreen;
