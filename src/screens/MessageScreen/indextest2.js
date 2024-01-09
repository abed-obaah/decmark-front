import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View, FlatList, Text } from "react-native";
import { AppSafeAreaView } from "@src/components/AppViews";
import { LargeText, MediumText, SmallText } from "@src/components/AppText";
import useTheme from "@src/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";

const MessageScreen = ({ color }) => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.data?.id; // Moved userInfo here

  const fetchData = async () => {
    try {
      const userId = userInfo?.data?.id;
      const user_id = await AsyncStorage.getItem("user_id");
      const mostRecentScheduleUserId = await AsyncStorage.getItem("mostRecentScheduleUserId");
      const mostRecentScheduleId = await AsyncStorage.getItem("mostRecentScheduleId");
      const loggedInUserId = await AsyncStorage.getItem("loggedInUserId");

      console.log("scheduledUserId: ", mostRecentScheduleUserId);
      console.log("mostRecent ScheduleId: ", mostRecentScheduleId);
      console.log("loggedInUserId: ",loggedInUserId);
      console.log("user_ids: ",userId);
      
      if (mostRecentScheduleUserId) {
        const isSender = user_id === mostRecentScheduleUserId;

        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${userInfo?.authentication.token}`,
        };

        axios
          .get(
            isSender
              ? `https://api.decmark.com/v1/user/message/message/receiver/${userId}`
              : `https://api.decmark.com/v1/user/message/message/sender/${mostRecentScheduleUserId}`,
            { headers }
          )
          .then((response) => {
            // Log the response data
            console.log("Response data:", response.data);
            
            console.log("scheduledUserId: ", mostRecentScheduleUserId);
            console.log("mostRecent ScheduleId: ", mostRecentScheduleId);
            console.log("loggedInUserId: ",loggedInUserId);
            console.log("user_id: ",userId);
            // Set the retrieved messages
            setMessages(response.data);

            // Set the userData here if it's available in the response
            // if (response.data.userData) {
            //   setUserData(response.data.userData);
            // }
          })
          .catch((error) => {
            console.log("Error fetching sender/receiver details and messages:", error.response);
          });
      }
    } catch (error) {
      console.log("Error retrieving data from AsyncStorage:", error.response);
    }
  };

  const navigateToChat = () => {
    if (userInfo && messages.length > 0) {
      const lastMessageItem = messages[messages.length - 1];
      const receiverId = lastMessageItem.receiver_id;
      console.log('Receiver ID:', receiverId);

      // Log first_name and last_name here
      console.log('First Name:', userInfo.data.first_name);
      console.log('Last Name:', userInfo.data.last_name);

      const { first_name, last_name, user_id } = userInfo;
      const names = `${userInfo.data.first_name} ${userInfo.data.last_name}`; // Concatenate first_name and last_name
      navigation.navigate("OthersStack", {
        screen: "ChatBody",
        params: {
          user_id: user_id,
          user2Id: receiverId,
          names: names, // Set the names as the concatenated value
        }
      });
    } else {
      alert('Please select a contact to chat with');
    }
  };

  

  const renderLastMessageItem = () => {
    if (messages.length > 0) {
      const lastMessageItem = messages[messages.length - 1];
  
      // Convert "created_at" to a Date object
      const createdAtDate = new Date(lastMessageItem.created_at);
      const now = new Date();
  
      // Calculate the time difference
      const timeDiffInMilliseconds = now - createdAtDate;
      const timeDiffInDays = timeDiffInMilliseconds / (1000 * 60 * 60 * 24);
  
      // Format date and time
      const formattedDate = createdAtDate.toLocaleDateString();
      const formattedTime = createdAtDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Use 12-hour format
      });
      const daysAgo = Math.floor(timeDiffInDays);
  
      // Determine the time display format
      let timeDisplay;
      if (daysAgo > 0) {
        timeDisplay = `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
      } else {
        timeDisplay = formattedTime;
      }
  
      return (
        <View style={{
          flexDirection: "row",
          paddingHorizontal: 25,
          paddingVertical: 10,
          alignItems: "center",
        }}>
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
              {lastMessageItem.receiver.first_name} {lastMessageItem.receiver.last_name}
            </MediumText>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <MediumText>{lastMessageItem.message}</MediumText>
                <MediumText>{daysAgo > 0 ? timeDisplay : formattedTime}</MediumText>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ margin: 10 }}>
          <Text>No messages available.</Text>
        </View>
      );
    }
  };
  

  // Use useFocusEffect to refresh data on screen focus
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, []);

  return (
    <AppSafeAreaView>
      <TouchableOpacity onPress={navigateToChat}>
        <FlatList
          data={messages.slice(-1)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLastMessageItem}
        />
      </TouchableOpacity>
    </AppSafeAreaView>
  );
};

export default MessageScreen;


