import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  Image,
  Clipboard,
  Alert 
} from 'react-native';
import PageHeader from "@src/components/PageHeader";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import { MediumText,LargeText } from "@src/components/AppText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";


const PayWithCardScreen = ({ amount, goBack,route  }) => {
  const { t} = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const validateAmount = () => {
    if (amount) {
      // setStage(1);
    }
  };

  const baseUrl = "https://api.decmark.com/v1/user";

  const copyToClipboard = () => {
    Clipboard.setString(accountNumber);
     Alert.alert("Copied", "Account Number copied to clipboard");
  };

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
        const userData = res.data.data.dedicatedAccountId;
      const dedicatedAccountId= userData 
        
        getDedicatedAccount(dedicatedAccountId)
      })
      .catch((err) => {
        alert("Error fetching user details:");
      });
  }, []);


  const getDedicatedAccount = async (dedicatedAccountId) => {
    if (!dedicatedAccountId) {
      console.log('No dedicated account ID provided');
      return;
    }
  
    const url = `https://api.paystack.co/dedicated_account/${dedicatedAccountId}`;
    const authorizationToken = 'Bearer sk_live_b9f0ebe1da3834cc08b7e12ca8dc2cb5d7719b7c';
  
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': authorizationToken,
          'Content-Type': 'application/json'
        }
      });

      const res = response.data.data;

      setAccountName(res.account_name);
      setAccountNumber(res.account_number);
      setBankName(res.bank.name);
      // Handle the response data
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      // Handle the error
    }
  };


  const formatPlaceholder = "xxxx-xxxx-xxxx-xxxx"; 
  return (
    <AppSafeAreaView>
      <AppScrollView>
        <View style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
          <MediumText>{t('copy')}</MediumText>
        </View>
        
        <View style={styles.container}>
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Ionicons name="copy-outline" size={24} color="#DEB253" />
          </TouchableOpacity>
        <View style={styles.textContainer}>
        <TouchableOpacity >
      <LargeText onPress={copyToClipboard}>{accountNumber}</LargeText>
      {/* Additionally, display the bank details */}
      <Text>{bankName}</Text>
      <Text>{accountName}</Text>
    </TouchableOpacity>
        </View>
      </View>
      </AppScrollView>
    
    </AppSafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    image: {
      width: 40,
      height: 40,
    //   borderRadius: SIZES.radius,
    //   borderColor: "grey",
      borderWidth: 1,
      marginRight: 20,
    },
    textContainer: {
      flex: 1,
    },
    copyButton: {
      padding: 10,
    },
  });
export default PayWithCardScreen;
