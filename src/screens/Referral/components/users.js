import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MediumText, LargeText } from "@src/components/AppText";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@src/hooks/useAppStore";
import MyAvatar from "@src/global/MyAvatar";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";


const StylistCard = ({ name, occupation, navigation }) => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [referredUsers, setReferredUsers] = useState([]);
  // https://api.decmark.com/v1/user/artisan/user/925c0b6e-e735-4487-9f83-6ccb517ec093/referred
  const { t} = useTranslation();

  useEffect(() => {
    const fetchReferredUsers = async () => {
      try {

        const userId = userInfo?.data?.id;

      if (!userId) {
        console.error("User ID is missing.");
        return;
      }
        // Replace the API endpoint with your actual endpoint
        const response = await axios.get(`https://api.decmark.com/v1/user/artisan/user/${userId}/referred`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo?.authentication.token}`,
          },
        });
        setReferredUsers(response.data.referredUsers);
        console.log(response.data.referredUsers)
      } catch (error) {
        console.error(error);
      }
    };

    fetchReferredUsers();
  }, []);
  


  return (
    <AppSafeAreaView>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProfileStack", {
            screen: "users",
          })
        }
      >
          <View>
            {referredUsers && referredUsers.length > 0 ? (
              referredUsers.map((user, index) => (
                <View key={index} style={styles.userContainer}>
                  <View style={styles.imageContainer}>
                    {/* MyAvatar component or image */}
                    <MyAvatar size={40} iconSize={40} image={user.profile_img} />
                  </View>
                  <View style={styles.textContainer}>
                    <MediumText>{`${user.first_name} ${user.last_name}`}</MediumText>
                    <MediumText>{user.gender}</MediumText>
                    <MediumText>{user.email}</MediumText>
                  </View>
                </View>
              ))
            ) : (
              <MediumText> {t('NoReferredUsersFound')}</MediumText>
            )}
          </View>

      </TouchableOpacity>
   
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  imageContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
});






export default StylistCard;
