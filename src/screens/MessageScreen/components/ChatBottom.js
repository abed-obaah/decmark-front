import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "@src/constants/theme";
import SendSVG from "@src/assets/svg/SendSVG";

const ChatBottom = ({ message, setMessage }) => {
  const validateSend = () => {};
  return (
    <View style={styles.messageview}>
      <View style={styles.inputview}>
        <Entypo name="emoji-happy" size={20} style={{ marginRight: 10 }} />
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Message"
          placeholderTextColor={COLORS.lightGrey}
          style={styles.messageinput}
        />
      </View>
      <TouchableOpacity onPress={validateSend} style={styles.sendbutton}>
        <SendSVG />
      </TouchableOpacity>
    </View>
  );
};

export default ChatBottom;

const styles = StyleSheet.create({
  messageview: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  sendbutton: {
    backgroundColor: "black",
    height: 50,
    width: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  messageinput: {
    flex: 1,
    fontFamily: "SourceSansPro-SemiBold",
    color: "black",
    marginRight: 5,
  },
  inputview: {
    flex: 1,
    backgroundColor: COLORS.lightGold,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
