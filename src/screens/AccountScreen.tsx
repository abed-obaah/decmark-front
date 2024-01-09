import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppScrollView, AppSafeAreaView } from "@src/components/AppViews";
import MyAvatar from "@src/global/MyAvatar";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "@src/hooks/useAppTheme";
import { MediumText, LargeText } from "@src/components/AppText";
import { useAppSelector, useAppDispatch } from "@src/hooks/useAppStore";
import { COLORS } from "@src/constants/theme";
import * as ImagePicker from "expo-image-picker";
import { uploadProfileImg } from "@src/redux/accountSlice";
import axios from "axios";
import Toast from 'react-native-toast-message';

const AccountScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Profile Updated',
      text2: 'Image uploaded successfully'
    });
  }
  
  const handlePickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.uri); // Update the avatar immediately with the selected image URI
  
        const formData = new FormData();
        formData.append('image', {
          uri: result.uri,
          name: `image_${Date.now()}.jpg`,
          type: 'image/jpeg',
        });
  

        const apiUrl = 'https://api.decmark.com/v1/user/account/upload-profile-image';
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo?.authentication.token}`,
          },
        });

        const responseData = await response.json(); // Parse response data for logging

        if (response.ok) {
          showToast();
          console.log('Image uploaded successfully:', responseData);
          // Handle success: perform actions based on the API response
        } else {
          console.error('Failed to upload image:', responseData);
          // Handle error: display error message or perform other actions
        }
      }
    } catch (error) {
      console.error('Error picking/uploading image:', error);
      // Handle error: display error message or perform other actions
    }
  };



  useEffect(() => {
    fetchImage();
    // checkPinCreation();
  }, []);

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
      console.log(data)
      setSelectedImage(data.user.profile_img);
    } catch (error) {
      console.error(error);
    }
  };
  
  const options = [
    {
      name: "Edit profile",
      path: "EditProfileScreen", // Update the path to navigate to the desired screen
      icon: (
        <Ionicons
          name="person-outline"
          size={20}
          color={theme.SECONDARY_TEXT_COLOR}
        />
      ),
    },
    {
      name: "Activities",
      path: "ActivitiesScreen", // Update the path to navigate to the desired screen
      icon: (
        <Ionicons name="list" size={20} color={theme.SECONDARY_TEXT_COLOR} />
      ),
    },
    {
      name: "Privacy Policy",
      path: "PrivacyPolicyScreen", // Update the path to navigate to the desired screen
      icon: (
        <Ionicons
          name="shield-checkmark-outline"
          size={20}
          color={theme.SECONDARY_TEXT_COLOR}
        />
      ),
    },
    {
      name: "Change Language",
      path: "ChangeLanguageScreen", // Update the path to navigate to the desired screen
      icon: (
        <Ionicons
          name="logo-google"
          size={20}
          color={theme.SECONDARY_TEXT_COLOR}
        />
      ),
    },
    {
      name: "Create pin ",
      path: "CreatePinScreen", // Update the path to navigate to the desired screen
      icon: (
        <Ionicons
          name="logo-google"
          size={20}
          color={theme.SECONDARY_TEXT_COLOR}
        />
      ),
    },
  ];

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <View style={styles.avatar}>
          <View style={{ position: "relative" }}>
            {/* add the url here from the */}
          <MyAvatar size={200} iconSize={100} image={selectedImage} />

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
                marginBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: theme.PRIMARY_BORDER_COLOR,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingBottom: 20,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate(item.path)}
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
              </TouchableOpacity>
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

function setSelectedImage(imageUrl: any) {
  throw new Error("Function not implemented.");
}

