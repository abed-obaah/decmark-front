import axios from "axios";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState, useRef,useEffect } from "react";
import PageHeader from "@src/components/PageHeader";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import AppInput from "@src/components/AppInput";
import AppButton from "@src/components/AppButton";
import { LargeText, SmallText } from "@src/components/AppText";
import useAppTheme from "@src/hooks/useAppTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";


const FundWalletScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { theme } = useAppTheme();

  const [amount, setAmount] = useState("");
  const [tag, setWalletTag] = useState("");
  const [remarks, setRemark] = useState("");
  const [remarkError, setRemarkError] = useState(""); // State to track the remark error message

  const userId = userInfo?.data?.id;

  const Transfer = () => {
    // Check if the remark is at least 10 characters long
    if (remarks.length < 10) {
      setRemarkError("Remark must be at least 10 characters");
      return; // Exit the function if there's an error
    }

    const transferData = {
      tag,
      amount,
      user_id: userId,
      remarks,
    };

    console.log("Transfer Data:", transferData); // Log the input values

    // Make a POST request to the API
    axios
      .post("https://api.decmark.com/v1/user/wallet/transfer", transferData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.authentication.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // HTTP 200: Success
          setVisible(true);
          console.log("Transfer response (HTTP 200):", response.data);
          // Handle success, e.g., show a success message or navigate to another screen
        } else if (response.status === 422) {
          alert("Transfer response (HTTP 422):");
          console.log("Transfer response (HTTP 422):", response.data);
        } else if (response.status === 409) {
          alert("Transfer response (HTTP 409):");
          console.log("Transfer response (HTTP 409):", response.data);
        } else {
          // Handle other status codes if needed
        }
      })
      .catch((error) => {
        if (error.response) {
          alert("Insufficient Funds");
          console.log(`Error transferring funds (HTTP ${error.response.status}):`, error.response.data);
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  const clearRemarkError = () => {
    // Function to clear the remark error message
    setRemarkError("");
  };

  const areAllFieldsFilled = () => {
    return tag && amount && remarks;
  };

  const [show,setShow] = useState(false);

  const ModalPopup = ({ visible, children }) => {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      toggleModal();
    }, [visible]);
  
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowModal(false);
        });
      }
  
      // if (visible) {
      //   setTimeout(() => {
      //     setShowModal(false);
      //   }, 4000);
      // }
    };

    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackground}>
          <Animated.View
            style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}
          >
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };

  const [visible, setVisible] = useState(false);
  return (
    <AppSafeAreaView>
      <PageHeader title={"Transfer Account"} />
      <AppScrollView>
        <>
        <View>
          <ModalPopup visible={visible}>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    source={require('../../../assets/x.png')}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../../assets/success.png')}
                style={{ height: 150, width: 150, marginVertical: 10 }}
              />
            </View>
            <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
              Transfer Success! You created a service.
            </Text>
          </ModalPopup>
        </View>
          
          <AppInput
            label="Wallet Tag"
            autoCapitalize="none"
            value={tag}
            onChangeText={(value) => setWalletTag(value)}
          />
          <AppInput
            label="Amount"
            autoCapitalize="none"
            keyboardType="numeric"
            value={amount}
            onChangeText={(value) => setAmount(value)}
          />
          <AppInput
            label="Id"
            autoCapitalize="none"
            keyboardType="numeric"
            value={userId}
            editable={false}
          />
          <AppInput
            label="Remarks"
            autoCapitalize="none"
            value={remarks}
            onChangeText={(value) => {
              setRemark(value);
              clearRemarkError(); // Clear the error message when the user edits the remark
            }}
          />
          {remarkError ? (
            <SmallText style={styles.errorText}>{remarkError}</SmallText>
          ) : (
            <SmallText style={styles.remarkNote}>
              The remark is required and must be up to 10 characters.
            </SmallText>
          )}
          <AppButton
            label="Transfer"
            onPress={areAllFieldsFilled() ? Transfer : null}
            disabled={!areAllFieldsFilled()}
          />
        </>
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default FundWalletScreen;

const styles = StyleSheet.create({
  remarkNote: {
    color: "gray",
    fontSize: 12,
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
