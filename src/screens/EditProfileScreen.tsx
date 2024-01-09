import React, { useState,useEffect } from "react";
import { LargeText } from "@src/components/AppText";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import AppInput from "@src/components/AppInput";
import AppButton from "@src/components/AppButton";
import AppTextarea from "@src/components/AppTextarea";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@src/hooks/useAppStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';


const EditProfileScreen = () => {
  const dispatch = useAppDispatch();
  const baseUrl = "https://api.decmark.com/v1/user";
  const apiKey = "base64:vhMcjElk3d0BYItZB09fP5MbUEPXH2JRtqW3G5/tKSk=";

  


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [homeDescription, setHomeDescription] = useState("");
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const userId = userInfo?.data?.id;
    // Fetch user details when the component mounts
    axios
      .get(`${baseUrl}/auth/user/${userId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userInfo?.authentication.token}`,
        },
      })
      .then((res) => {
        const userDetails = res.data.data;
        console.log(userDetails)
        
        setFirstName(userDetails.first_name);
        setLastName(userDetails.last_name);
        setEmail(userDetails.email);
        setPhone(userDetails.phone);
        setState(userDetails.state);
        setCity(userDetails.city);
        setAddress(userDetails.address);
        setHomeDescription(userDetails.home_description);
        
        
      })
      .catch((err) => {
       
        alert("Error fetching user details:");
      });
  }, []);



  const UpdateUser = () => {
    const userId = userInfo?.data?.id;
    const requestBody = {
      first_name:firstName,
      last_name:lastName,
      phone:phone,
      state:state,
      city:city,
      address:address,
      home_description:homeDescription,
    };

    axios
    .put(`${baseUrl}/auth/users/${userId}`, requestBody, { // Use the updated route URL
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userInfo?.authentication.token}`,
      },
    })
    .then((res) => {
      console.log("Response:", res.data);
      console.log(firstName);
      showToast();
    })
    .catch((err) => {
      console.log("The error is:", err.response);
      showToasts();
    });
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Profile Updated',
      text2: 'Your Profile has been Updated successfully.'
    });
  }
  const showToasts = () => {
    Toast.show({
      type: 'success',
      text1: 'Profile Update ERROR',
      text2: 'ERROR Updating your profile!.'
    });
  }

  

  return (
    <AppSafeAreaView>
      <AppScrollView>
     

        <AppInput
          label="First Name"
          value={firstName}
          onChangeText={(value) => setFirstName(value)}
         
        />

        <AppInput
          label="Last Name"
          value={lastName}
          // onChangeText={setLastName}
          onChangeText={(value) => setLastName(value)}
        />

        <AppInput label="Email Address"
         value={email}
          // onChangeText={setEmail}
          onChangeText={(value) => setEmail(value)}
           />

        <AppInput label="Phone"
         value={phone}
         onChangeText={(value) => setPhone(value)}
        //  onChangeText={setPhone}
          />

        <AppInput label="State"
         value={state} 
        //  onChangeText={setState}
         onChangeText={(value) => setState(value)}
          />

        <AppInput label="City"
         value={city} 
        //  onChangeText={setCity}
         onChangeText={(value) => setCity(value)}
          />

        <AppInput label="Address"
         value={address} 
        //  onChangeText={setAddress}
         onChangeText={(value) => setAddress(value)}
         />

        <AppInput
          label="Home Address"
          value={homeDescription}
          // onChangeText={setHomeDescription}
          onChangeText={(value) => setHomeDescription(value)}
        />

        <AppButton label="Save" onPress={UpdateUser} />
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default EditProfileScreen;
