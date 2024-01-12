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
import { Ionicons } from "@expo/vector-icons";



const PayWithCardScreen = ({ amount, goBack }) => {

  const validateAmount = () => {
    if (amount) {
      // setStage(1);
    }
  };

  

  const copyToClipboard = () => {
    Clipboard.setString('0889705646');
     Alert.alert("Copied", "Account Number copied to clipboard");
  };
  const formatPlaceholder = "xxxx-xxxx-xxxx-xxxx"; 
  return (
    <AppSafeAreaView>
      <AppScrollView>
        <View style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
          <MediumText>Copy the account number below and make transfer to the account.</MediumText>
        </View>
        
        <View style={styles.container}>
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Ionicons name="copy-outline" size={24} color="#DEB253" />
          </TouchableOpacity>
        <View style={styles.textContainer}>
        <TouchableOpacity >
      <LargeText onPress={copyToClipboard}>0889705646</LargeText>
      {/* Additionally, display the bank details */}
      <Text>GT Bank</Text>
      <Text>DecMark Limited</Text>
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
