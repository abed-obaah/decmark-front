import { Text, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { MediumText } from "@src/components/AppText";
import { useRoute } from '@react-navigation/native';







const RenderPeople = ({ item, color, navigation,receiver_id}) => {
  const route = useRoute();
const { id, price, user_id, descriptions, type, providerType } = route.params;
  const navigateToChat = () => {
    navigation.navigate("OthersStack", {
      screen: "ChatBody",
      params: { ...item,},
      receiver_id:user_id,
    });
  };
  
  return (
    <TouchableOpacity
      onPress={navigateToChat}
      style={{
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingVertical: 10,
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: 55,
          height: 55,
          borderRadius: 30,
          marginRight: 20,
        }}
        source={require("../../../assets/images/my_avatar.png")}
      />
      <View style={{ flex: 1 }}>
        <MediumText style={{ color, fontFamily: "SourceSansPro-SemiBold" }}>
          {item.receiver.first_name} {''}
          {item.receiver.last_name}
        </MediumText>
        <MediumText>{item.lastMsg}</MediumText>
      </View>
      <View>
        <MediumText>{item.time}</MediumText>
        <Text style={{ fontFamily: 'your-font', color: 'your-color' }}>{item.senderId}</Text>
       
      </View>
    </TouchableOpacity>
  );
};

export default RenderPeople;

const styles = StyleSheet.create({});
