import React, { useEffect, useState } from 'react';
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
import QRCode from 'react-native-qrcode-svg';
import BankName from './components/BankNames';
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";
import { useAppSelector, useAppDispatch } from "@src/hooks/useAppStore";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";



const PayWithUssd = () => {
    const [CVV, setCVV] = useState('');
    const [Expiry, setExpiry] = useState('');
    const [Amount, setAmount] = useState("");
    const [carNumber, setCarNumber] = useState('');
    const { t} = useTranslation();
    const { userInfo } = useSelector((state) => state.auth);
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    

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



  return (
    <AppSafeAreaView>
        <AppScrollView>
        
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <LargeText>{t('dail')}</LargeText>
        </View>
        <View style={styles.container}>

        <Text style={styles.label}>{t('amount')}</Text>
        <TextInput
          style={styles.input}
          value={Amount}
          placeholder={t('enterAmount')}
          onChangeText={text => setAmount(text)}
        />
       

        <View style={styles.rowContainer}>
                    <View style={styles.boxContainer}>
                <LargeText>{t('accountCopy')}</LargeText>
                <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Ionicons name="copy-outline" size={20} color="#DEB253" />
          </TouchableOpacity>
          <MediumText onPress={copyToClipboard}>{accountNumber}</MediumText>
          
                </View>
                
        </View>
        
        <BankName
        title={bankName}
        name={accountName}
        details="*737*50*0011*416#"
        imageSource={require("../../assets/images/tgt.png")}
        index={0}
      />
          {/* <BankName
            title="Zenith Bank"
            details="*737*50*0011*416#"
            imageSource={require("../../assets/images/zenith.jpeg")}
            index={1}
          />
          <BankName
            title="Polaris Bank"
            details="*737*50*0011*416#"
            imageSource={require("../../assets/images/polaris.png")}
            index={2}
          /> */}

        {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Pay NGN 40,000</Text>
        </TouchableOpacity> */}
        </View>
        

        </AppScrollView>
    </AppSafeAreaView>
   
  );
};

export default PayWithUssd;

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
    image: {
        flex: 1,
        width: 20,
        height: 20,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
      },
     
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: 100,
    //   marginBottom: ,
    },
    boxContainer: {
        flexDirection: "row",
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
      width: 20,
      height: 50,
      resizeMode: 'contain',
      marginTop: -20,
      marginRight: 10,
      marginLeft: 10,
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
    copyButton: {
      padding: 4,
    },
    

  });
// export default PayWithCardScreen;
