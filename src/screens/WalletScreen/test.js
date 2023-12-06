import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  TextInput,
  Button
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
  const { theme } = useTheme();
  const [amountVisible, setAmountVisible] = useState(true);
  const [walletData, setWalletData] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  
  // const [pin, setPin] = useState();

  const { width } = useWindowDimensions();

  // State variables for modal and PIN input
  const [isModalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState();

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      // Replace 'your_user_id' with the actual user ID
      // const userId = "6556c33a-0bfe-49dc-9815-b8ad8706a331";
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

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("user_id");
      return userId;
    } catch (error) {
      console.error("Error retrieving user ID:", error);
      return null;
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
      fun: () => setModalVisible(true), // Open the PIN setup modal
    },
  ];

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to save the PIN and make an API call
  const savePin = async () => {
    try {
      const response = await axios.post(
        "https://api.decmark.com/v1/user/auth/pin/create",
        { pin },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo?.authentication.token}`,
          },
        }
      );
      
      // Handle the response as needed
      console.log("PIN creation response:", response.data);
    } catch (error) {
      console.error("Error creating PIN:", error);
      // Handle the error
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
          <View   
            style={{
              height: 250,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MediumText>Oops!</MediumText>
            <MediumText>No transactions history</MediumText>
          </View>
        </AppSectionView>
      </AppRareScrollView>

      {/* PIN setup modal */}
      <Modal isVisible={isModalVisible}>
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
      </Modal>
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
});