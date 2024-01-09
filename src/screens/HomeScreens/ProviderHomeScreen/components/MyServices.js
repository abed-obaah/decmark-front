import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, RefreshControl, StyleSheet,Animated } from 'react-native';
import { SmallText, MediumText } from '@src/components/AppText';
import AppButton from '@src/components/AppButton';
import { SIZES } from '@src/constants/theme';
import useTheme from '@src/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";

// const notificationApi = 'https://app.nativenotify.com/api/notification'

const MyServices = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async (id) => {
    try {
      setRefreshing(true); // Set refreshing to true before making the request
      const response = await axios.get("https://api.decmark.com/v1/user/services/allservices");
      const data = response.data.data;
      console.log(data); // Check the API response data
      setServices(data);
      setLoading(false); // Set loading to false when the data is fetched
      setRefreshing(false); // Set refreshing to false after the data is fetched
  
      // Send POST request to the new API after fetching data
      const postData = {
        appId: 10360,
        appToken: "bt5HPDNHpKOD4SdARVdthY",
        title: "Services",
        body: "You created a service",
        dateSent: "8-14-2023 3:03PM",
        pushData: { yourProperty: "yourPropertyValue" },
        // bigPictureURL: "Big picture URL as a string"
        
      };
  
      const postResponse = await axios.post("https://app.nativenotify.com/api/notification", postData);
      console.log("POST response:", postResponse.data);
    } catch (error) {
      console.log("Error fetching services:", error);
      setLoading(false); // Set loading to false even if there's an error
      setRefreshing(false); // Set refreshing to false if there's an error
    }
  };
  

  const handleDeleteAction = async (id) => {
    const userId = userInfo?.data?.id;
    try {
     
  
      const DeleteData = {
        user_id: userId
      };
  
      const response = await axios.delete(`https://api.decmark.com/v1/user/services/${id}/remove`, { data: DeleteData });
      // Handle success here, if needed
      console.log("Services Deleted:", response);
      // You might want to refresh the services after deletion
      fetchServices(); // Call the function to refresh the service list
    } catch (error) {
      console.log("Error deleting Service:", error.response);
      // Handle error here
    }
  };

  const renderRightActions = (progress, dragX, item) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      // <RectButton
      //   style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'flex-end', padding: 0, paddingHorizontal:6,
      //    paddingVertical:4,
      //     height:"80%"}}
      //   onPress={() => handleDelete(
      //     // item.price,
      //     // item.id,
      //     // item.coordinate,
      //     // item.title,
      //     // item.description,
      //     // item.duration,
      //     // item.user_id,
      //     item.id
      //     )}
      // >
      //   <Animated.Text style={{ color: 'white', transform: [{ scale: trans }] }}><Ionicons name="trash-outline" size={60} color={theme.gold} /></Animated.Text>
      // </RectButton>
      <RectButton
        style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'flex-end', padding: 0, paddingHorizontal:6,
         paddingVertical:4,
          height:"80%"}}
          onPress={() => handleDeleteAction(item.id)}
      >
        <Animated.Text style={{ color: 'white', transform: [{ scale: trans }] }}><Ionicons name="trash-outline" size={60} color={theme.gold} /></Animated.Text>
      </RectButton>
    );
  };
  

  const Service = ({ item }) => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const {
      category,
      title,
      price,
      description,
      location,
      type,
      coordinate,
      provider
    } = item; // Destructure the fields
  
   
  
    return (
      <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}>
        <View
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            marginBottom: 20,
            borderWidth: 1,
            borderRadius: SIZES.radius,
            borderColor: theme.PRIMARY_BORDER_COLOR,
          }}
        >
        
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View>
              <MediumText
                numberOfLines={1}
                style={{
                  color: theme.PRIMARY_TEXT_COLOR,
                  // fontFamily: "FONT_SEMI_BOLD",
                }}
              >
                {provider.name}
              </MediumText>
              <MediumText>{type}</MediumText>
            </View>
            <View>
              <MediumText
                style={{
                  color: theme.PRIMARY_TEXT_COLOR,
                  // fontFamily: "FONT_SEMI_BOLD",
                }}
              >
                ₦{price}
              </MediumText>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Ionicons name="star" size={12} color={theme.gold} />
                <Ionicons name="star" size={12} color={theme.gold} />
                <Ionicons name="star" size={12} color={theme.gold} />
                <Ionicons name="star" size={12} color={theme.gold} />
                <Ionicons name="star" size={12} color={theme.gold} />
              </View>
            </View>
          </View>
          <SmallText>{title}</SmallText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 25,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "60%",
              }}
            >
              <Ionicons name="location-outline" size={20} color={theme.gold} />
              <Text
                numberOfLines={1}
                style={{
                  color: theme.PRIMARY_TEXT_COLOR,
                  marginLeft: 1,
                }}
              >
                {coordinate}
              </Text>
            </View>
            <AppButton
              label="Update"
              marginTop={0.5}
              buttonHeight={40}
              onPress={() => navigation.navigate('ProfileStack',
               { screen: 'EditService' })}
              // onPress={() => setVisible(true)}
            />
          </View>
        </View>
        </View>
      </Swipeable>
    );
  };

  const handleRefresh = () => {
    fetchServices(); // Call the fetchServices function to refresh the data
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        // Show loader while the API is loading
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.PRIMARY_COLOR} />
        </View>
      ) : (
        // Show service list when the data is loaded
        <FlatList
          data={services}
          bounces={false}
          contentContainerStyle={{ marginVertical: 15, paddingHorizontal: 20 }}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <Service item={item} />}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
             colors={[theme.PRIMARY_COLOR]}
            />
          )}
        />
      )}
    </View>
  );
};



export default MyServices;
