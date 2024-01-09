import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  TextInput,
  Button,Text
  , BottomSheet 
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppSafeAreaView,AppSectionView, AppRareScrollView} from "@src/components/AppViews";
import { LargeText, MediumText, SmallText } from "@src/components/AppText";
import useAppTheme from "@src/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import PageHeader from "@src/components/PageHeader";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryScreen = () => {
  const { theme } = useAppTheme();
  const [amountVisible, setAmountVisible] = useState(true);
  const [walletData, setWalletData] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  // State variables for modal and PIN input
  // const [isModalVisible, setModalVisible] = useState(false);
  // const [pin, setPin] = useState("");
  // const { width } = useWindowDimensions();
  // const [requiresPinCreation, setRequiresPinCreation] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [singleRecipt, setRecipts] = useState([]);
  
 

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
  

  return (
    <AppSafeAreaView>
      <PageHeader title={"History"} />
      {/* <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LargeText
          style={{
            color: theme.PRIMARY_TEXT_COLOR,
          }}
        >
          No History
        </LargeText>
        <SmallText
          style={{
            textAlign: "center",
            paddingHorizontal: 25,
            marginTop: 10,
          }}
        >
          We’re excited for you to recieve your first service. They will be
          listed here for feedback.
        </SmallText>
      </View> */}
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
    </AppSafeAreaView>
  );
};

export default HistoryScreen;

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
