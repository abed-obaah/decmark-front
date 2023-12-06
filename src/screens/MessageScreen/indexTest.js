import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "@src/components/AppViews";
import { LargeText, MediumText, SmallText } from "@src/components/AppText";
import useTheme from "@src/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default MessageScreen = ({ color }) => {
  const { theme } = useTheme();
  const [receiverData, setReceiverData] = useState(null);
  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageTime, setLastMessageTime] = useState("");

  const route = useRoute();
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      const mostRecentScheduleUserId = await AsyncStorage.getItem(
        "mostRecentScheduleUserId"
      );
      console.log(mostRecentScheduleUserId);
      console.log(user_id);

      if (mostRecentScheduleUserId) {
        axios
          .get(
            `https://api.decmark.com/v1/user/message/receiver/${mostRecentScheduleUserId}`
          )
          .then((response) => {
            const receiverData = response.data.receiver;
            const messages = response.data.messages;

            if (messages.length > 0) {
              const lastMessageText = messages[messages.length - 1].message;
              const lastMessageCreatedAt = messages[messages.length - 1].created_at;

              setLastMessage(lastMessageText);

              const currentTime = new Date();
              const messageTime = new Date(lastMessageCreatedAt);
              const timeDiff = currentTime - messageTime;
              const hoursDiff = timeDiff / (1000 * 60 * 60);

              if (hoursDiff >= 24) {
                // More than 24 hours, display as a day
                const daysAgo = Math.floor(hoursDiff / 24);
                setLastMessageTime(`${daysAgo} days ago`);
              } else {
                // Less than 24 hours, display as time
                const options = { hour: "numeric", minute: "numeric" };
                setLastMessageTime(
                  messageTime.toLocaleTimeString(undefined, options)
                );
              }
            }

            console.log(receiverData);
            setReceiverData(receiverData);
          })
          .catch((error) => {
            console.error("Error fetching receiver details:", error.response);
          });
      }
    } catch (error) {
      console.log("Error retrieving data from AsyncStorage:", error.response);
    }
  };

  const navigateToChat = () => {  
    console.log(user_id);
    console.log(userInfo?.data?.user_id);
    // navigation.navigate("OthersStack", {
    //   screen: "ChatBody",
    //   params: {
    //     receiver_id: userInfo?.data?.user_id,
    //   },
    // });
  };

  // Use useFocusEffect to automatically refresh the data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <AppSafeAreaView>
      {userInfo && userInfo.data && userInfo.data.user_id ? (
        <View>
          {receiverData ? (
            <View>
              {/* Display information about the person here */}
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
                  source={require("../../assets/images/my_avatar.png")}
                />
                <View style={{ flex: 1 }}>
                  <MediumText
                    style={{ color, fontFamily: "SourceSansPro-SemiBold" }}
                  >
                    {receiverData.first_name} {receiverData.last_name}
                  </MediumText>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <MediumText>{lastMessage}</MediumText>
                      <MediumText>{lastMessageTime}</MediumText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="ios-chatbox-ellipses"
                color={theme.SECONDARY_TEXT_COLOR}
                size={100}
              />
              <MediumText>No Messages yet</MediumText>
              <SmallText
                style={{
                  position: "absolute",
                  bottom: 50,
                  color: theme.PRIMARY_TEXT_COLOR,
                }}
              >
                NOTE: Chats will disappear{" "}
                <SmallText style={{ color: theme.GOLDEN_TEXT }}>7 days</SmallText>{" "}
                after closing a service
              </SmallText>
            </View>
          )}
        </View>
      ) : (
        <View>
          {receiverData ? (
            <View>
              {/* Display information about the person here */}
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
                  source={require("../../assets/images/my_avatar.png")}
                />
                <View style={{ flex: 1 }}>
                  <MediumText
                    style={{ color, fontFamily: "SourceSansPro-SemiBold" }}
                  >
                    {receiverData.first_name} {receiverData.last_name}
                  </MediumText>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <MediumText>{lastMessage}</MediumText>
                      <MediumText>{lastMessageTime}</MediumText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="ios-chatbox-ellipses"
                color={theme.SECONDARY_TEXT_COLOR}
                size={100}
              />
              <MediumText>No Messages yet</MediumText>
              <SmallText
                style={{
                  position: "absolute",
                  bottom: 50,
                  color: theme.PRIMARY_TEXT_COLOR,
                }}
              >
                NOTE: Chats will disappear{" "}
                <SmallText style={{ color: theme.GOLDEN_TEXT }}>7 days</SmallText>{" "}
                after closing a service
              </SmallText>
            </View>
          )}
        </View>
      )}
    </AppSafeAreaView>
  );
};
