import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  TextInput,
  Button,Text
  , BottomSheet 
} from "react-native";
import {
  AppRareScrollView,
  AppSafeAreaView,
  AppSectionView,
} from "@src/components/AppViews";
import useTheme from "@src/hooks/useAppTheme";
import { LargeText, MediumText, SmallText } from "@src/components/AppText";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-native-modal"; // Import the modal component
import AppInput from '@src/components/AppInput';


export default WalletScreen = ({ navigation }) => {
  // const { theme } = useTheme();
  // const [amountVisible, setAmountVisible] = useState(true);
  // const [walletData, setWalletData] = useState(null);
  // const { userInfo } = useSelector((state) => state.auth);

  
  // // const [pin, setPin] = useState();

  // const { width } = useWindowDimensions();

  // // State variables for modal and PIN input
  // const [isModalVisible, setModalVisible] = useState(false);
  // const [pin, setPin] = useState();

  const { theme } = useTheme();
  const [amountVisible, setAmountVisible] = useState(true);
  const [walletData, setWalletData] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  // State variables for modal and PIN input
  const [isModalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const { width } = useWindowDimensions();
  const [requiresPinCreation, setRequiresPinCreation] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [singleRecipt, setRecipts] = useState([]);
 


  useEffect(() => {
    fetchWallet();
    checkPinCreation();
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
    } catch (error) {
      console.error(error);
    }
  };

  const checkPinCreation = async () => {
    try {
      const userId = userInfo?.data?.id;
      const response = await axios.get(
        `https://api.decmark.com/v1/user/wallet/user/${userId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo.authentication.token}`,
          },
        }
      );

      const pinExists = response.data.pinExists;
      setRequiresPinCreation(!pinExists);
    } catch (error) {
      console.error("Error checking PIN:", error);
    }
  };

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("user_id");
      return userId;
    } catch (error) {
      console.error("Error retrieving user ID:", error);
      return null;
    }
  };




  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const userId = userInfo?.data?.id;

      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      const response = await axios.get(
        `https://api.decmark.com/v1/user/wallet/transactions`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo?.authentication.token}`,
          },
        }
      );

      const transactionsData = response.data;
        setUserData(transactionsData.user);
        setTransactions(transactionsData.transactions);
        console.log(transactionsData)
    } catch (error) {
      console.log("Error fetching transactions:", error.response);
    }
  };


  const options = [
    {
      icon: "card-outline",
      text: "Deposit",
      fun: () =>
        navigation.navigate("WalletStack", { screen: "FundWalletScreen" }),
    },
    {
      icon: "paper-plane",
      text: "Withdraw",
      fun: () => navigation.navigate("WalletStack", { screen: "WalletScreen" }),
    },
    {
      icon: "move",
      text: "Transfer",
      fun: () => navigation.navigate("WalletStack", { screen: "TransferScreen" }),
    },
  ];

  // Function to toggle modal visibility
  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };

  // Function to save the PIN and make an API call
  // const savePin = async () => {
  //   if (pin.length === 4) {
  //     try {
  //       const response = await axios.post(
  //         "https://api.decmark.com/v1/user/auth/pin/create",
  //         { pin },
  //         {
  //           headers: {
  //             Accept: "application/json",
  //             Authorization: `Bearer ${userInfo?.authentication.token}`,
  //           },
  //         }
  //       );

  //       // Handle the response as needed
  //       console.log("PIN creation response:", response.data);

  //       // Close the modal after PIN creation
  //       toggleModal();

  //       // Alert "Transfer" here or navigate to the transfer screen
  //       // navigation.navigate("TransferScreen");
  //       alert("Transfer");
  //     } catch (error) {
  //       console.error("Error creating PIN:", error);
  //       // Handle the error
  //     }
  //   } else {
  //     console.error("Invalid PIN");
  //     // Handle invalid PIN
  //   }
  // };

  const showSuccess = () => {
    setShowSuccessModal(true);
  };

  const hideSuccess = () => {
    setShowSuccessModal(false);
  };

  const formatDate = (dateString) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-');
  
    const monthIndex = parseInt(month) - 1; // Adjust month to start from 0 (January is 0)
    const formattedDate = `${parseInt(day)} ${months[monthIndex]}, ${year}`;
  
    return formattedDate;
  };

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetData, setBottomSheetData] = useState(null);

  const handleTransactionPress = async (transactionId) => {
    try {
      const apiUrl = `https://api.decmark.com/v1/user/wallet/transactions/${transactionId}`;
      console.log('API URL:', apiUrl); // Check if the URL is correctly formatted
      
      const response = await fetch(apiUrl, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userInfo?.authentication.token}`,
        },
      });
      
      if (!response.ok) {
        console.error('Failed to fetch data. HTTP Status:', response.status.message);
        return;
      }
      
      const data = await response.json();
      console.log('Data:', data); // Log the retrieved data
     setRecipts(data)
     showSuccess()
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  
  return (
    <AppSafeAreaView>
      <AppRareScrollView>
      <AppSectionView style={{ paddingHorizontal: 20 }}>
          <View
            style={[
              styles.overview,
              {
                backgroundColor: theme.INPUT_BACKGROUND_COLOR,
                borderColor: theme.PRIMARY_BORDER_COLOR,
              },
            ]}
          >
            <View>
              <LargeText>
                ₦ {amountVisible ? walletData?.amount.amount : "XXXXXX.XX"}
              </LargeText>
              <SmallText
                style={{ color: theme.PRIMARY_TEXT_COLOR, marginTop: 10 }}
              >
                Book Balance:
                <SmallText style={{ color: theme.GOLDEN_TEXT }}>
                  {" "}
                  {amountVisible ? walletData?.amount.display : "XXXXXX.XX"}
                </SmallText>
              </SmallText>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setAmountVisible(!amountVisible)}
                style={{ paddingRight: 5 }}
              >
                <Ionicons
                  name={amountVisible ? "eye-off" : "eye"}
                  size={24}
                  color={theme.PRIMARY_TEXT_COLOR}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Modal transparent visible={showSuccessModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.successText}>{singleRecipt.action}</Text>
              {/* <Text style={styles.successText}>{singleRecipt.amount.amount}</Text> */}
              {/* <AppButton label="View Receipt" onPress={viewReceipt} /> */}

              <TouchableOpacity onPress={hideSuccess} style={styles.cancelButton}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
            }}
          >
            {options.map((item, i) => (
              <TouchableOpacity
                onPress={item.fun}
                key={i}
                style={{
                  width: (width - 40) / options.length,
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderRightColor:
                    i + 1 === options.length
                      ? "transparent"
                      : theme.PRIMARY_BORDER_COLOR,
                }}
              >
                <Ionicons
                  name={item.icon}
                  size={15}
                  color={theme.PRIMARY_TEXT_COLOR}
                />
                <SmallText style={{ color: theme.PRIMARY_TEXT_COLOR }}>
                  {item.text}
                </SmallText>
              </TouchableOpacity>
            ))}
          </View>
        </AppSectionView>

        <AppSectionView>
  <LargeText
    style={{
      paddingBottom: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.PRIMARY_BORDER_COLOR,
    }}
  >
    Transactions
  </LargeText>
  <View>
      {/* Display user information */}
   

      {/* Display transactions */}
      <View style={styles.transactionsContainer}>
        
      {transactions.map((transaction, index) => (
  <TouchableOpacity
    key={index}
    onPress={() => handleTransactionPress(transaction.id)} // Replace handleTransactionPress with your function
    style={styles.touchableTransaction}
  >
    <View style={styles.transactionItem}>
      <View style={styles.transactionDetails}>
        <Text>{transaction.type}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={transaction.type === 'debit' ? styles.debitAmount : styles.creditAmount}
          >
            {transaction.type === 'debit' ? '-' : '+'}
            {transaction.amount.currency}
            {transaction.amount.amount}
          </Text>
          <Text style={styles.transferText}>
            {transaction.type === 'debit' ? ' Transfered' : ' Received'}
          </Text>
        </View>
      </View>
      <Text>{formatDate(transaction.created_at)}</Text>
    </View>
  </TouchableOpacity>
))}

</View>
    </View>
    {/* </View> */}
</AppSectionView>

      </AppRareScrollView>

      {/* PIN setup modal */}
      {/* <Modal isVisible={isModalVisible}>
            <View style={[styles.pinModal, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
                          <TextInput
                        style={styles.pinInput}
                        value={pin}
                        onChangeText={(text) => {
                          console.log("PIN Input Value:", text); // Log the value as the user enters it
                          setPin(text);
                        }}
                        placeholder="Enter your PIN"
                        secureTextEntry={true}
                        keyboardType="numeric"
                      />
              <Button title="Save PIN" onPress={savePin} />
              <Button title="Cancel" onPress={toggleModal} />
            </View>
      </Modal> */}
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },

  pinModal: {
    backgroundColor: "white", // Soft white background color
    borderRadius: 10, // Curved edges
    padding: 20, // Padding for content
  },

  pinInput: {
    borderColor:"black", // Border color
    borderWidth: 1, // Border width
    borderRadius: 5, // Curved edges
    padding: 10, // Padding for the input
    marginBottom: 10, // Space between elements
  },

  userInfoContainer: {
    marginBottom: 20,
  },

  transactionsContainer: {
    // borderWidth: 1,
    padding: 10,
  },

  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#CCCCCC',
  },

  transactionDetails: {
    flex: 1,
  },
  debitAmount: {
    color: 'red',
  },
  creditAmount: {
    color: 'green',
  },
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