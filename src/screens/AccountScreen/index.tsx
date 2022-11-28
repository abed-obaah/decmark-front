import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppScrollView, AppSafeAreaView } from "@src/components/AppViews";
import MyAvatar from "../../global/MyAvatar";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "@src/hooks/useAppTheme";
import { MediumText, LargeText } from "@src/components/AppText";
import { useAppSelector, useAppDispatch } from "@src/hooks/useAppStore";
import { COLORS } from "@src/constants/theme";
import * as ImagePicker from "expo-image-picker";
import { uploadProfileImg } from "@src/redux/accountSlice";

const AccountScreen = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const inputs = {
        image: result.assets[0].uri,
      };
      dispatch(uploadProfileImg(inputs));
    }
  };

  const options = [
    {
      name: "Edit Profle",
      icon: (
        <Ionicons
          name="person-outline"
          size={20}
          color={theme.SECONDARY_TEXT_COLOR}
        />
      ),
    },
    {
      name: "Terms and Conditions",
      icon: (
        <Ionicons
          name="newspaper-outline"
          size={20}
          color={theme.SECONDARY_TEXT_COLOR}
        />
      ),
    },
    {
      name: "Privacy Policy",
      icon: (
        <Ionicons
          name="shield-checkmark-outline"
          size={20}
          color={theme.SECONDARY_TEXT_COLOR}
        />
      ),
    },
    {
      name: "Activities",
      icon: (
        <Ionicons name="list" size={20} color={theme.SECONDARY_TEXT_COLOR} />
      ),
    },
  ];

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <View style={styles.avatar}>
          <View style={{ position: "relative" }}>
            <MyAvatar size={200} iconSize={100} />
            <TouchableOpacity
              style={[{ backgroundColor: COLORS.gold }, styles.editAvatar]}
              onPress={handlePickImage}
            >
              <Ionicons name="ios-camera" size={22} color={COLORS.dark} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <LargeText>
            {userInfo?.data?.first_name} {userInfo?.data?.last_name}
          </LargeText>
          <MediumText>{userInfo?.data?.email}</MediumText>
        </View>
        <View style={{ marginTop: 20 }}>
          {options.map((item, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 20,
                marginBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: theme.PRIMARY_BORDER_COLOR,
              }}
            >
              {item.icon}
              <MediumText
                style={{
                  color: theme.PRIMARY_TEXT_COLOR,
                  paddingHorizontal: 10,
                }}
              >
                {item.name}
              </MediumText>
            </View>
          ))}
        </View>
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    marginTop: 10,
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    zIndex: 1,
  },
});
