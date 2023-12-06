import React, { useState,useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import {
  AppView,
  AppScrollView,
  AppSafeAreaView,
} from "@src/components/AppViews";
import MyAvatar from "../../global/MyAvatar";
import { SmallText, LargeText, MediumText } from "@src/components/AppText";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import useTheme from "@src/hooks/useAppTheme";
import useSwitchUserMode from "@src/hooks/useSwitchUserMode";
import MenuOptions from "./components/MenuOptions";
import { logoutUser } from "@src/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@src/hooks/useAppStore";
import axios from "axios";



const MenuScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { userMode, handleToggleUserMode } = useSwitchUserMode();
  const [amountVisible, setAmountVisible] = useState(false);
  const { userInfo } = useAppSelector((state) => state.auth);
  const [walletData, setWalletData] = useState(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchWallet();
    // checkPinCreation();
  }, []);

  const fetchWallet = async () => {
    try {
      const userId = userInfo?.data?.id;

      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      const response = await axios.get(
        `https://api.decmark.com/v1/user/wallet?user_id=${userId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userInfo?.authentication.token}`,
          },
        }
      );

      const data = response.data;
      setWalletData(data);
    } catch (error) {
      console.error(error);
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



  return (
    <AppSafeAreaView>
      <AppView
        style={{
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: theme.PRIMARY_BORDER_COLOR,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProfileStack", { screen: "AccountScreen" })
          }
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MyAvatar size={45} image={selectedImage}/>
            <View style={{ marginLeft: 10 }}>
              <LargeText>
                @{userInfo?.data?.first_name.toLowerCase()}_
                {userInfo?.data?.last_name.toLowerCase()}
              </LargeText>
              <SmallText>{userInfo?.data?.email}</SmallText>
            </View>
          </View>
          <EvilIcons
            name="chevron-right"
            size={35}
            color={theme.SECONDARY_TEXT_COLOR}
            style={{
              justifyContent: "flex-end",
              right: 0,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="wallet"
                size={26}
                color={theme.PRIMARY_TEXT_COLOR}
              />
            </TouchableOpacity>
            <View style={{ width: 5 }} />
            <LargeText>₦ {amountVisible ? walletData?.amount?.amount : "XXXXXX.XX"}</LargeText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            
            <TouchableOpacity onPress={() => setAmountVisible(!amountVisible)}>
              
              <Ionicons
                name={amountVisible ? "eye-off-outline" : "eye-outline"}
                size={26}
                color={theme.PRIMARY_TEXT_COLOR}
              />
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity 
                       onPress={() =>
                        navigation.navigate('WalletScreen')}
            >
              <Ionicons
                name="add-circle"
                size={26}
                color={theme.PRIMARY_TEXT_COLOR}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom:12 }}>
  <MediumText  style={{
          color: theme.PRIMARY_TEXT_COLOR,
          alignItems: "center",
          padding: 0.5,
          paddingHorizontal: 5,
          borderRadius: 25,
        }}>Become a Service Provider?</MediumText>
  <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: theme.PRIMARY_BORDER_COLOR,borderWidth: 1,borderRadius: 25, marginBottom: 10, padding: 2.5, backgroundColor: theme.INPUT_BACKGROUND_COLOR,
 }}>
    {["receiver", "provider"].map((item, i) => (
      <TouchableOpacity
        key={i}
        style={{
          backgroundColor:
            item === userMode ? theme.gold : "transparent",
          alignItems: "center",
          padding: 0.5,
          paddingHorizontal: 5,
          borderRadius: 25,
          color: theme.PRIMARY_TEXT_COLOR
          
        }}
        onPress={() => handleToggleUserMode(item)}
      >
        <MediumText
          style={{
            color:
              item === userMode
                ? theme.dark
                : theme.SECONDARY_TEXT_COLOR,
            textTransform: "capitalize",
            color: theme.PRIMARY_TEXT_COLOR
          }}
        >
          {item}
        </MediumText>
      </TouchableOpacity>
    ))}
  </View>
        </View>
      </AppView>

      <AppScrollView>
        <MenuOptions />
      </AppScrollView>

      <AppView
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopWidth: 1,
          borderTopColor: theme.PRIMARY_BORDER_COLOR,
        }}
      >
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => dispatch(logoutUser())}
        >
          <Ionicons
            name="log-out-outline"
            size={26}
            color={theme.PRIMARY_TEXT_COLOR}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical: 10 }}
        onPress={() =>
          navigation.navigate("ProfileStack", {
            screen: "TippingPage",
          })
        }
        >
          {/* <Ionicons
            name="pricetags-sharp"
            size={26}
            color={theme.PRIMARY_TEXT_COLOR}
          /> */}

        <Image
          source={require("@src/assets/images/tip.png")}
          style={{
            height: 50, // Adjust the height as per your requirement
            width: 50, // Adjust the width as per your requirement
            borderRadius: 25, // Make the borderRadius half of the width/height for a rounded border effect
            borderWidth: 26, // Set the border width
           
          }}
        />
        </TouchableOpacity>
      </AppView>
    </AppSafeAreaView>
  );
};

export default MenuScreen;
