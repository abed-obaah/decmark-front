import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TimePickerAndroid,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { AppScrollView, AppSafeAreaView } from "@src/components/AppViews";
import AppButton from '@src/components/AppButton';
import AppTextarea from '@src/components/AppTextarea';
import AppInput from '@src/components/AppInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
// import { MediumText } from "../../components/AppText";
import { useNavigation } from "@react-navigation/native";
import useOnChange from "@src/hooks/forms/useOnChange";
import { resetAuth } from "@src/redux/authSlice";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { LargeText, MediumText, SmallText } from "@src/components/AppText";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";


const CourierScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [price, setPrice] = useState(false);
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState([1, 0]);
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState([1, 0]);
  const baseUrl = "https://api.decmark.com/v1/user";
  const { userInfo } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { t} = useTranslation();

const CourierService = () => {
  const userId = userInfo?.data?.id;
  setLoading(true);
  const requestBody = {
    destination,
    title,
    origin,
    price,
    description,
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Courier Requested',
      text2: 'Your request Has been sent successfully'
    });
  }


  setTimeout(() => {
    setLoading(false); // Hide loader after the operation completes
    axios.post(`${baseUrl}/courier/create`,requestBody,{
      headers: {
        Accept: "application/json",
       Authorization: `Bearer ${userInfo?.authentication.token}`,
      },
    }).then((res) =>{
      showToast();
      console.log("Response:", res.data);
      navigation.goBack();
    })
    .catch((err)=>{
      console.log("The error is:", err.response);
    })
  }, 3000); // Replace this setTimeout with your actual logic
};


 

  return (
              <AppSafeAreaView>
                <AppScrollView>
                <Modal visible={loading} transparent>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#DEB253" />
        </View>
      </Modal>
                  <AppInput
                label={t('title')}
                value={title}
                onChangeText={(value) => {
                  if (value.length <= 10) {
                    setTitle(value);
                  } else {
                    // Truncate the input to 10 characters
                    setTitle(value.slice(0, 10));
                  }
                }}
          />
      <SmallText>
        This will be shown to potential couriers. Keep it short and descriptive.not under and over  10 Characters
      </SmallText>
        <AppInput
          label={t('whereLocate')}
          value={origin.toString()} // Convert the array to a string for display
          onChangeText={(value) => setOrigin(value.split(',').map(Number))} // Split the string and convert it back to an array
        />

        <AppInput
          label={t('whereTo')}
          value={destination.toString()} // Convert the array to a string for display
          onChangeText={(value) => setDestination(value.split(',').map(Number))} // Split the string and convert it back to an array
        />


        <AppInput label={t('description')}
         value={description} 
        onChangeText={(value) => setDescription(value)}/>

        <AppInput label={t('price')}
          value={price} 
          keyboardType="numeric"
          onChangeText={(value) => setPrice(value)}
         />
        
        <AppButton label={t('PostaRequest')} onPress={CourierService}/>
      </AppScrollView>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  timePickerContainer: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  timePickerText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
 
  timeOption: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  timeOptionText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 16,
  },
  datePickerContainer: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default CourierScreen;
