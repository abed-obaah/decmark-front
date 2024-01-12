import React, { useState } from 'react';
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



const PayWithUssd = () => {
    const [CVV, setCVV] = useState('');
    const [Expiry, setExpiry] = useState('');
    const [Amount, setAmount] = useState("");
    const [carNumber, setCarNumber] = useState('');
    const { t} = useTranslation();

    const copyToClipboard = () => {
      Clipboard.setString('0889705646');
       Alert.alert("Copied", "Account Number copied to clipboard");
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
          <MediumText onPress={copyToClipboard}>0889705646</MediumText>
                </View>
        </View>
        <BankName
        title="GTBank"
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
