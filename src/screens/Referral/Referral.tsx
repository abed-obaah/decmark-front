import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { LargeText, MediumText } from "@src/components/AppText";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import AppInput from "@src/components/AppInput";
import AppButton from "@src/components/AppButton";
import AppTextarea from "@src/components/AppTextarea";
import { Ionicons } from "@expo/vector-icons";
import { Clipboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@src/hooks/useAppStore";
import axios from "axios";

const Referral = () => {
  const navigation = useNavigation();
  const [referralLink, setReferralLink] = useState("");
  const { userInfo } = useAppSelector((state) => state.auth);
  const [tag, setTag] = useState<string | null>(null);

  const fetchImage = async () => {
    try {
      const userId = userInfo?.data?.id;

      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      const response = await axios.get(
        `https://api.decmark.com/v1/user/artisan/user/${userId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo?.authentication.token}`,
          },
        }
      );

      const data = response.data;
      console.log(data);
      setTag(data.user.tag);
      setReferralLink(data.user.tag);
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(referralLink);
    Alert.alert("Copied", "Referral link copied to clipboard");
  };

  const handleGenerate = () => {
    fetchImage();
  };

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <AppInput label="Referral" value={tag} disabled />
          </View>
          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Ionicons name="copy-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <AppButton label="Generate" onPress={handleGenerate} />

        <MediumText
          style={{ marginVertical: 8 }}
          onPress={() =>
            navigation.navigate("ProfileStack", {
              screen: "users",
            })
          }
        >
          View Referred Users
        </MediumText>
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default Referral;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  copyButton: {
    padding: 10,
  },
});

