import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

import axios from 'axios';
import PageHeader from '@src/components/PageHeader';
import { AppSafeAreaView, AppScrollView } from '@src/components/AppViews';
import AppInput from '@src/components/AppInput';
import AppButton from '@src/components/AppButton';
import { LargeText, SmallText } from '@src/components/AppText';
import useAppTheme from '@src/hooks/useAppTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { t } from "i18next";
// import PDF from 'react-native-pdf';
// import RNFS from 'react-native-fs';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";

const FundWalletScreen = () => {
  const navigation = useNavigation();
  const { userInfo } = useSelector((state) => state.auth);
  const { theme } = useAppTheme();

  const [amount, setAmount] = useState('');
  const [tag, setWalletTag] = useState('');
  const [remarks, setRemark] = useState('');
  const [remarkError, setRemarkError] = useState('');
  const [bankList, setBankList] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [resolvedAccountName, setResolvedAccountName] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const { t} = useTranslation();


  useEffect(() => {
    fetchBankList();
  }, []);

  const fetchBankList = async () => {
    try {
      // const SECRET_KEY = 'pk_live_897d77bf82968eb17c2eaf5972dbc8fcfe7bbe45';
      const SECRET_KEY = 'pk_test_d55e2c5ae69892961f5a7a21ef34628960cbd0ff';
      const response = await axios.get('https://api.paystack.co/bank', {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      });
      setBankList(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setShowBankModal(false);
  };

  const handleSearch = (text) => {
    setSearchKeyword(text);
    const filtered = bankList.filter(
      (bank) =>
        bank.name.toLowerCase().includes(text.toLowerCase()) ||
        bank.code.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBanks(filtered);
  };

  const clearRemarkError = () => {
    setRemarkError('');
  };

  const areAllFieldsFilled = () => {
    return tag && amount && remarks;
  };

  const Transfer = async () => {
    if (remarks.length < 10) {
      setRemarkError('Remark must be at least 10 characters');
      return;
    }

    if (!tag || !selectedBank) {
      Alert.alert('Please select a bank and enter an account number');
      return;
    }

    try {
      // const SECRET_KEY = 'pk_live_897d77bf82968eb17c2eaf5972dbc8fcfe7bbe45';
      const SECRET_KEY = 'pk_test_d55e2c5ae69892961f5a7a21ef34628960cbd0ff';
      
      const resolveEndpoint = `https://api.paystack.co/bank/resolve?account_number=${tag}&bank_code=${selectedBank.code}`;
      const response = await axios.get(resolveEndpoint, {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      const accountName = response.data.data.account_name;
      setResolvedAccountName(accountName); // Set the account name to state

      const transferRecipientData = {
        type: 'nuban',
        name: accountName,
        account_number: tag,
        bank_code: selectedBank.code,
        currency: 'NGN',
      };
      const postResponse = await axios.post(
        'https://api.paystack.co/transferrecipient',
        transferRecipientData,
        {
          headers: {
            Authorization: `Bearer ${SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      const recipientCode = postResponse.data.data.recipient_code;

      // Generate UUID
     const uniqueReference = uuidv4();


     // Create transfer data
      const transferData = {
        source: 'balance',
        domain: "test",
        amount: '100',
        reference: uniqueReference,
        recipient: recipientCode,
        reason: remarks, // Using the remarks as the reason
      };
      const requestStoragePermission = async () => {
        try {
          if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission',
                message: 'App needs access to your storage to save the receipt as PDF.',
              }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          }
          return true; // For iOS, permission is not required
        } catch (err) {
          console.error(err);
          return false;
        }
      };
    
      
    

      const transferResponse = await axios.post(
        'https://api.paystack.co/transfer',
        transferData,
        {
          headers: {
            Authorization: `Bearer ${SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      showSuccess(); 
      console.log(postResponse.data);
      console.log(accountName); 
      console.log(uniqueReference);
      console.log(recipientCode);
      console.log(remarks);
      console.log(transferResponse);
      // Now you have the resolved account details in response.data
      // Proceed with your logic here
    } catch (error) {
      const errorMessage = error.response.data.message;
      console.error(errorMessage);
    }
  };


  const showSuccess = () => {
    setShowSuccessModal(true);
  };

  const hideSuccess = () => {
    setShowSuccessModal(false);
  };

  const createAndSavePDF = async () => {
    const permissionGranted = await requestStoragePermission();

    if (!permissionGranted) {
      console.log('Storage permission denied');
      return;
    }

    const receiptHTML = `
      <html>
        <head><title>Receipt</title></head>
        <body>
          <h1>Receipt</h1>
          <p>Transaction ID: ${receiptData.transactionId}</p>
          <p>Amount: ${receiptData.amount}</p>
          <p>Recipient: ${receiptData.recipientName}</p>
          <p>Date: ${receiptData.date}</p>
          <!-- Other relevant data -->
        </body>
      </html>
    `;

    const receiptPath = `${RNFS.ExternalStorageDirectoryPath}/receipt.pdf`;

    RNFS.writeFile(receiptPath, receiptHTML, 'utf8')
      .then(() => {
        console.log('Receipt saved:', receiptPath);
        // Show success message or perform any further actions
      })
      .catch((error) => {
        console.error('Error saving receipt:', error);
      });
  };

  const Receipt = ({ receiptData }) => {
    return (
      <View style={styles.receiptContainer}>
        <Text style={styles.title}>Receipt</Text>
        <View style={styles.detailsContainer}>
          <Text>Transaction ID: {receiptData.transactionId}</Text>
          <Text>Amount: {receiptData.amount}</Text>
          <Text>Recipient: {receiptData.recipientName}</Text>
          <Text>Date: {receiptData.date}</Text>
          {/* Display other relevant data */}
        </View>
      </View>
    );
  };

  const receiptData = {
    transactionId: 'TRX12345',
    amount: '1000',
    recipientName: 'John Doe',
    date: '2023-11-25',
    // ...other relevant data
  };


  const viewReceipt = () => {
    setShowReceipt(true);
  };
 

  return (
    <AppSafeAreaView>
      <AppScrollView>
      <View>
      <Modal transparent visible={showBankModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <AppInput
              placeholder={t('searchBanks')}
              value={searchKeyword}
              onChangeText={(text) => handleSearch(text)}
            />
            <FlatList
              data={filteredBanks}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleBankSelect(item)}>
                  <Text style={styles.bankItem}>{item.name} {""}({item.code})</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setShowBankModal(false)}
              style={styles.cancelButton}>
              <Text>{t('cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>

    <Modal transparent visible={showSuccessModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.successText}>{t('transferSuccess')}!</Text>
              <AppButton label="View Receipt" onPress={viewReceipt} />
              <TouchableOpacity onPress={hideSuccess} style={styles.cancelButton}>
                <Text>{t('close')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal transparent visible={showReceipt}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Receipt receiptData={receiptData} />
            <TouchableOpacity onPress={() => setShowReceipt(false)} style={styles.closeButton}>
              <Text>{t('closeReceipt')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={createAndSavePDF} style={styles.downloadButton}>
              <Text>{t('save')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


        <AppInput
          label={t('selectBank')}
          value={selectedBank ? selectedBank.name : ''}
          onPress={() => setShowBankModal(true)}
          editable={true}
        />

        <AppInput
          label={t('accountNum')}
          autoCapitalize="none"
          value={tag}
          onChangeText={(value) => setWalletTag(value)}
        />
        {resolvedAccountName ? (
          <SmallText>{resolvedAccountName}</SmallText>
        ) : null}

        <AppInput
          label={t('amount')}
          autoCapitalize="none"
          keyboardType="numeric"
          value={amount}
          onChangeText={(value) => setAmount(value)}
        />

        <AppInput
          label={t('remarks')}
          autoCapitalize="none"
          value={remarks}
          onChangeText={(value) => {
            setRemark(value);
            clearRemarkError();
          }}
        />
        {remarkError ? (
          <SmallText style={styles.errorText}>{remarkError}</SmallText>
        ) : (
          <SmallText style={styles.remarkNote}>
            {t('remarksDetails')}
          </SmallText>
        )}
        <AppButton
          label={t('Transfer')}
          onPress={areAllFieldsFilled() ? Transfer : null}
          disabled={!areAllFieldsFilled()}
        />
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default FundWalletScreen;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height:'50%',
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 10,
    marginTop:'100%'
  },
  bankItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  remarkNote: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
