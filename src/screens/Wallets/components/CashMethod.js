import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import { LargeText, MediumText } from "@src/components/AppText";
import { SIZES } from "@src/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";



// const shows = () => {
//   alert('Pay with card goes here')
// };
const CashMethod = ({ title, details }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", marginTop: 30, alignItems: "center" }}
      onPress={() =>
        navigation.navigate("ProfileStack", {
          screen: "PayWithCardScreen",
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
      </View>
      <Ionicons size={20} name={"chevron-forward-outline"} />
    </TouchableOpacity>
  );
};

export default CashMethod;

const styles = StyleSheet.create({});
