import { StyleSheet, Image, View, TouchableOpacity,Text } from "react-native";
import React from "react";
import { LargeText, MediumText } from "@src/components/AppText";
import { SIZES } from "@src/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";




const CashMethod = ({ title, details, onPress, amount }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", marginTop: 30, alignItems: "center" }}
      onPress={() =>
       
        navigation.navigate("ProfileStack", {
          
          screen: "PayWithCardScreen",
          params: {
            amount: amount, // Pass 'amount' to PayWithCardScreen
          },
        })
      }
    >
      <Image
      source={require('../../../assets/images/card.png')}
        style={{
          height: 40,
          width: 40,
          borderRadius: SIZES.radius,
          borderColor: "grey",
          borderWidth: 1,
          marginRight: 20,
        }}
        
      />
      <View style={{ flex: 1 }}>
        <LargeText>{title}</LargeText>
        <MediumText>{details}</MediumText>
        {amount && <Text>Amount: {amount}</Text>}
      </View>
      <Ionicons size={20} name={"chevron-forward-outline"} />
    </TouchableOpacity>
  );
};

export default CashMethod;

const styles = StyleSheet.create({});
