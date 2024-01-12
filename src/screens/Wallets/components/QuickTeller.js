import { StyleSheet, Image, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { LargeText, MediumText } from "@src/components/AppText";
import { SIZES } from "@src/constants/theme";
import { Ionicons } from "@expo/vector-icons";


const showsc =() => {
  alert("pay with quick Teller");
}
const QuickTeller = ({ title, details }) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", marginTop: 30, alignItems: "center" }}
      onPress={showsc}
    >
      <Image
      source={require('../../../assets/images/quickteller3.png')}
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
      </View>
      <Ionicons size={20} name={"chevron-forward-outline"} />
    </TouchableOpacity>
  );
};

export default QuickTeller;

const styles = StyleSheet.create({});
