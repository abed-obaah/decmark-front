import React, { useState,useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  TextInput,SafeAreaView
} from "react-native";
import { AppSafeAreaView } from "@src/components/AppViews";
import GroupTab from "@src/components/GroupTab";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { SmallText, MediumText } from '@src/components/AppText';
import AppButton from '@src/components/AppButton';
import { SIZES } from '@src/constants/theme';
import useTheme from '@src/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
 import NoServices from "./shared/NoServices.js";
 import { useTranslation } from 'react-i18next';
 import { changeLanguage } from "i18next";


const MyServiceScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { t} = useTranslation();

  const screens = [
    <BookedServicesScreen />,
    <OpenServicesScreen />,
    <SettledServicesScreen />,
  ];

  return (
    <AppSafeAreaView >
      <GroupTab
        tabs={[`${t('booked')}`, `${t('open')}`, `${t('settled')}`]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {screens[activeTab]}
    </AppSafeAreaView>
  );
};

const BookedServicesScreen = () => {
  const [bookedServices, setBookedServices] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const { theme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    // Function to fetch booked services
    const fetchBookedServices = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const apiUrl = 'https://api.decmark.com/v1/user/artisan/appointments/new';

        // Replace 'YOUR_API_KEY' with your actual API key
        const apiKey = userInfo?.authentication.token;

        const headers = {
          Authorization: `Bearer ${apiKey}`,
          // Add other headers as needed
        };

        const response = await axios.get(apiUrl, { headers });

        // Assuming the response data is an array of booked services
        const bookedServices = response.data.data;

        // Update the state with all the fetched data
        setAppointments(bookedServices);
      } catch (error) {
        console.error('Error fetching booked services:', error);
      }
    };

    // Call the fetchBookedServices function
    fetchBookedServices();
  }, [userInfo]); // Empty dependency array ensures the effect runs only once

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    // <View>
    //   <Text>Names: {item.reciever.name}</Text>
    //   <Text>Description: {item.description}</Text>
    //   <Text>Due Date: {item.dueDate}</Text>
    //   {/* Add more fields as needed */}
    //   <Text>--------------------------</Text>
    // </View>
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
            fontFamily: "SourceSansPro-Regular",
            fontWeight:"bold"
          }}
        >
         {item.reciever.name}
        </MediumText>
        <MediumText></MediumText>
        <MediumText
         style={{
          fontFamily: "SourceSansPro-Regular",
          fontWeight:"bold"
        }}
        >{item.description}</MediumText>
      </View>
      <View>
        <MediumText
          style={{
            color: theme.PRIMARY_TEXT_COLOR,
            fontFamily: "SourceSansPro-Regular",
            fontWeight:"bold"
          }}
        >
        {item.recieverType}
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
    {/* <SmallText>{item.recieverType}</SmallText> */}
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
            fontFamily: "SourceSansPro-Regular",
            fontWeight:"bold"
          }}
        >
          {item.dueDate}
        </Text>
      </View>
      <AppButton
        // label={item.status}
        label="View"
        marginTop={0.5}
        buttonHeight={40}
        onPress={() => navigation.navigate('ProfileStack',
         { screen: 'EditService' })}
        // onPress={() => setVisible(true)}
      />
    </View>
  </View>
  </View>
  );

  return (
    <FlatList
      data={appointments}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={ <NoServices/>}
    />
  );
  
};

const OpenServicesScreen = () => {
  const [openedServices, setOpenedServices] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const { theme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    // Function to fetch booked services
    const fetchOpenedServices = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const apiUrl = 'https://api.decmark.com/v1/user/artisan/appointments/open';

        // Replace 'YOUR_API_KEY' with your actual API key
        const apiKey = userInfo?.authentication.token;

        const headers = {
          Authorization: `Bearer ${apiKey}`,
          // Add other headers as needed
        };

        const response = await axios.get(apiUrl, { headers });

        // Assuming the response data is an array of booked services
        const OpenedServices = response.data.data;
          console.log(OpenedServices);
        // Update the state with all the fetched data
        setAppointments(OpenedServices);
      } catch (error) {
        console.error('Error fetching booked services:', error);
      }
    };

    // Call the fetchBookedServices function
    fetchOpenedServices();
  }, [userInfo]); // Empty dependency array ensures the effect runs only once

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    // <View>
    //   <Text>Names: {item.reciever.name}</Text>
    //   <Text>Description: {item.description}</Text>
    //   <Text>Due Date: {item.dueDate}</Text>
    //   {/* Add more fields as needed */}
    //   <Text>--------------------------</Text>
    // </View>
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
            fontFamily: "SourceSansPro-Regular",
            fontWeight:"bold"
          }}
        >
         {item.reciever.name}
        </MediumText>
        <MediumText></MediumText>
        <MediumText
         style={{
          fontFamily: "SourceSansPro-Regular",
          fontWeight:"bold"
        }}>{item.description}</MediumText>
      </View>
      <View>
        <MediumText
          style={{
            color: theme.PRIMARY_TEXT_COLOR,
            // fontFamily: "FONT_SEMI_BOLD",
            fontFamily: "SourceSansPro-Regular",
            fontWeight:"bold"
          }}
        >
        {item.recieverType}
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
    {/* <SmallText>{item.recieverType}</SmallText> */}
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
            fontFamily: "SourceSansPro-Regular",
            fontWeight:"bold"
          }}
        >
          {item.dueDate}
        </Text>
      </View>
      <AppButton
        label="View"
        marginTop={0.5}
        buttonHeight={40}
        onPress={() => navigation.navigate('ProfileStack',
         { screen: 'EditService' })}
        // onPress={() => setVisible(true)}
      />
    </View>
  </View>
  </View>
  );

  return (
    <FlatList
      data={appointments}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={ <NoServices/>}
    />
  );
};

const SettledServicesScreen = () => {
  const [settledServices, setSettledServices] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const { theme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    // Function to fetch booked services
    const fetchSettledServices = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const apiUrl = 'https://api.decmark.com/v1/user/artisan/appointments/';

        // Replace 'YOUR_API_KEY' with your actual API key
        const apiKey = userInfo?.authentication.token;

        const headers = {
          Authorization: `Bearer ${apiKey}`,
          // Add other headers as needed
        };

        const response = await axios.get(apiUrl, { headers });

        // Assuming the response data is an array of booked services
        const SettledServices = response.data.data;
          console.log(SettledServices);
        // Update the state with all the fetched data
        setAppointments(SettledServices);
      } catch (error) {
        console.error('Error fetching booked services:', error);
      }
    };

    // Call the fetchBookedServices function
    fetchSettledServices();
  }, [userInfo]); // Empty dependency array ensures the effect runs only once

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    // <View>
    //   <Text>Names: {item.reciever.name}</Text>
    //   <Text>Description: {item.description}</Text>
    //   <Text>Due Date: {item.dueDate}</Text>
    //   {/* Add more fields as needed */}
    //   <Text>--------------------------</Text>
    // </View>
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
            fontFamily: "SourceSansPro-Regular",
            fontWeight:"bold"
          }}
        >
         {item.reciever.name}
        </MediumText>
        <MediumText></MediumText>
        <MediumText
         style={{
          fontFamily: "SourceSansPro-Regular",
          fontWeight:"bold"
        }}>{item.description}</MediumText>
      </View>
      <View>
        <MediumText
          style={{
            color: theme.PRIMARY_TEXT_COLOR,
            fontFamily: "SourceSansPro-Regular",
            fontWeight:"bold"
          }}
        >
        {item.recieverType}
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
    <SmallText>{item.price}</SmallText>
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
          {item.dueDate}
        </Text>
      </View>
      <AppButton
        label="View"
        marginTop={0.5}
        buttonHeight={40}
        onPress={() => navigation.navigate('ProfileStack',
         { screen: 'EditService' })}
        // onPress={() => setVisible(true)}
      />
    </View>
  </View>
  </View>
  );

  return (
    <FlatList
      data={appointments}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
    <NoServices/>}
    />
  );
};

export default MyServiceScreen;
