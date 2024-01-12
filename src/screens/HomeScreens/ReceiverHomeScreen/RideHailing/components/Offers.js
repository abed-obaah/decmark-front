import React, { useState, useEffect, useRef } from 'react';
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
  TextInput
} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { LargeText, MediumText } from "@src/components/AppText";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import { useNavigation } from "@react-navigation/native";
// import ProgressSteps, { Title, Content } from '@joaosousa/react-native-progress-steps';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import AppButton from '@src/components/AppButton';
import AppTextarea from '@src/components/AppTextarea';
import AppInput from '@src/components/AppInput';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import useOnChange from "@src/hooks/forms/useOnChange";
// import { useEffect } from "react";
import { resetAuth } from "@src/redux/authSlice";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";

const OfferScreen = () => {
  const navigation = useNavigation();
  const progressStepsRef = useRef(null);
  const [step, setStep] = useState(0);
  const [stepChanged, setStepChanged] = useState(false);
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedHours, setSelectedHours] = useState(0);
  const [customHours, setCustomHours] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [duration, setDuration] = useState('');
  const [howOften, setHowOften] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [coordinate, setCoordinate] = useState([1, 0]);
  const [location, setLocation] = useState("");
  // const [work_done, setWorkDone] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const baseUrl = "https://api.decmark.com/v1/user";
  const [selected, setSelected] = React.useState("");
  const { t} = useTranslation();

  const scrollY = useRef(new Animated.Value(0)).current;


  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleDateSelection = () => {
    if (Platform.OS === 'ios') {
      return (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          onChange={(value)=>handleDateChange('selectedDate',value)}
        />
      );
    } else {
      showDatePickerModal();
    }
  };

 

 

  const handleTimeSelection = async () => {
    if (Platform.OS === 'android') {
      try {
        const { action, hour, minute } = await TimePickerAndroid.open({
          is24Hour: false,
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          const time = new Date();
          time.setHours(hour);
          time.setMinutes(minute);
          setSelectedTime(time);
        }
      } catch ({ code, message }) {
        console.warn('Cannot open time picker', message);
        // Handle the error case, e.g., show an error message to the user
      }
    } else {
      console.warn('Time picker is not supported on this platform');
    }
  };

    const handleSubmit = () => {
      // Handle form submission
      Keyboard.dismiss();
      const valid = handleValidateFormOffer();
    
      if(valid){
        console.log("this form is valid");
        console.log("input values", inputs);
      }else {
        console.log("form is invalid");
        console.log("values", inputs);
      }
    };

  //budget
  const [value, setValue] = useState('');

  // const handleInputChange = (text) => {
  //   let numericValue = text.replace(/\D/g, '');
  //   if (numericValue.length > 3) {
  //     numericValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //   }
  //   setValue(numericValue);
  // };

  const handleInputChange = (text) => {
  let numericValue = text.replace(/\D/g, '');
  setValue(numericValue);
};


  const incrementValue = () => {
    setValue((prevValue) => String(parseInt(prevValue) + 1));
  };

  const decrementValue = () => {
    setValue((prevValue) => {
      const newValue = parseInt(prevValue) - 1;
      return newValue >= 0 ? String(newValue) : "0";
    });
  };

  const buttonTextStyle = {
    color: '#DEB253'
};

const toggleModal = () => {
  setModalVisible(!isModalVisible);
};

const handleHourSelection = (hours) => {
  setSelectedHours(hours);
  setCustomHours('');
  toggleModal();
};

const handleCustomHourChange = (text) => {
  setCustomHours(text);
};

const errandApi = () => {

  const requestBody = {
    type: selected,
    title,
    coordinate,
    price: value,
    duration: selectedHours,
    description,
    date: selectedDate,
    // work_done:value,
    // location
  };

  console.log("input values:", requestBody);
  axios
  .post(`${baseUrl}/errand/store`, requestBody, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${userInfo?.authentication.token}`,
    },
  })
  .then((res) => {
    if(res.status === 500){
      alert('internal server error');
    }
    setVisible(true);
    console.log("Response:", res.data);
  })
  .catch((err) => {
    setVisible(true);
    if (err.response && err.response.status === 422) {
      // Handle 422 Unprocessable Entity error (validation error)
      alert("Check your credentials"); // You can replace this with your desired error handling logic
    } else {
      console.log("The error is:", err);
    }
  });
}
const ModalPopup = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowModal(false);
      });
    }

    // if (visible) {
    //   setTimeout(() => {
    //     setShowModal(false);
    //   }, 4000);
    // }
  };



  


  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const [visible, setVisible] = useState(false);
const data = [
  {key:'1', value:'CLEANING '},
  {key:'2', value:'TAILORING '},
  {key:'3', value:'BEAUTY '},
  {key:'4', value:'PHOTOGRAPHY '},
  {key:'5', value:'LAUNDRY '},
  {key:'6', value:'REPAIR '},
  {key:'7', value:'FURNITURE '},
]

useEffect(() => {
    if (stepChanged) {
      setStepChanged(false);
    }
  }, [step, stepChanged]);

  const goToNextStep = () => {
    if (progressStepsRef.current) {
      progressStepsRef.current.onNext();
      setStepChanged(true);
      setStep(prevStep => prevStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (progressStepsRef.current) {
      progressStepsRef.current.onPrevious();
      setStepChanged(true);
      setStep(prevStep => prevStep - 1);
    }
  };

  return(
    <View style={{flex: 1}}>
      <View>
          <ModalPopup visible={visible}>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    source={require('../../../../../assets/images/cancel-remov.png')}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../../../../assets/images/sucess2.png')}
                style={{ height: 150, width: 150, marginVertical: 10 }}
              />
            </View>
            <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
              Congratulations! Your Offer Has been Created.
            </Text>
          </ModalPopup>
        </View>
    <ProgressSteps  activeStepIconBorderColor="#DEB253"
        activeStepIconColor="#DEB253"
        completedLabelColor="#DEB253"
        progressBarColor="#DEB25380"
        labelColor="lightgray"
        activeLabelColor="#DEB253"
        completedProgressBarColor="#DEB253"
        completedStepIconColor="#DEB253"
        activeStep={step}
        ref={progressStepsRef}
       
        >
        <ProgressStep label={t('createOffer')} nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
            <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                onPress={() => setStep(1)} // Set the step value to the next step (1)
              >
                <View style={styles.container}>
                  <View style={styles.contentContainer}>
                    <View style={styles.plusContainer}>
                      <View style={styles.plusIconMask}>
                        <Ionicons name="add" size={40} color="black" />
                      </View>
                    </View>
                    <LargeText style={styles.createOfferText}>{t('createOffer')}</LargeText>
                  </View>
                </View>
        </TouchableOpacity>

            </View>
        </ProgressStep>
        <ProgressStep label={t('OfferDetails')}  nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
            <View style={styles.container}>
            <Text style={styles.label}>{t('select')}</Text>
                <TouchableOpacity style={styles.datePickerContainer} onPress={handleDateSelection}>
                  <Text style={styles.dateText}>{selectedDate ? selectedDate.toDateString() : `${t('select')}`}</Text>
                </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {/* end of select Date */}

        
        {/* Select Time */}
        <Text style={styles.label}>{t('selectTime')}</Text>
        <TouchableOpacity style={styles.durationInput} onPress={toggleModal}>
            <Text style={styles.durationInputText}>
              {selectedHours ? `${selectedHours} hours` : `${t('Duration')}`}
            </Text>
            <Ionicons name="time-outline" size={24} color="black" />
          </TouchableOpacity>

        {/* Time Picker Modal */}
        <Modal visible={isModalVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.hourOption}
                  onPress={() => handleHourSelection(1)}
                >
                  <Text style={styles.hourOptionText}>1 hour</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.hourOption}
                  onPress={() => handleHourSelection(2)}
                >
                  <Text style={styles.hourOptionText}>2 hours</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.hourOption}
                  onPress={() => handleHourSelection(3)}
                >
                  <Text style={styles.hourOptionText}>3 hours</Text>
                </TouchableOpacity>
                
                <TextInput
                  style={styles.customHoursInput}
                  placeholder={t('customDuration')}
                  value={customHours}
                  onChangeText={handleCustomHourChange}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.hourOption}
                  onPress={() => handleHourSelection(parseInt(customHours))}
                >
                  <Text style={styles.hourOptionText}>{t('customDuration')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
          <View>
          <Text>{t('type')}</Text>
          <SelectList
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
            />
          </View>
      

        <View style={{width:"100%"}}>

             <AppInput label={t('title')}
                value={title}
                onChangeText={(value) => setTitle(value)}
            />

           <AppInput
                label={t('coordinate')}
                value={coordinate.join(", ")}
                onChangeText={(value) => setCoordinate(value.split(", ").map(Number))}
              />
            <AppInput label={t('description')}
              value={description}
              onChangeText={(value) => setDescription(value)}
            />
        </View>
        
            </View>
        </ProgressStep>
        <ProgressStep label={t('Budget')} nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}
        onSubmit={errandApi}>
            <View>
            <AppScrollView contentContainerStyle={styles.containerBudget}>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={incrementValue}>
              <FontAwesome name="angle-right" size={24} color="#999999" style={[styles.icon, styles.invertedIcon]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={decrementValue}>
              <FontAwesome name="angle-left" size={24} color="#999999" style={[styles.icon, styles.invertedIcon]} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={`₦${value}`}
            keyboardType="numeric"
            onChangeText={handleInputChange}
            placeholder={t('enterValue')}
          />
        </View>
        <View style={{paddingVertical:12}}>
          <MediumText>{t('enterAmount')}</MediumText>
        </View>
      </AppScrollView>
            </View>
        </ProgressStep>
    </ProgressSteps>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingVertical: 70,
    marginBottom:50,
    paddingHorizontal:2
  },
  containerBudget: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:122,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: "50%",
  },
  plusContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#DEB253',
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIconMask: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DEB253',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createOfferText: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DEB253',
    borderRadius: 8,
    backgroundColor: '#eeeade',
    padding: 10,
    width: "50%",
    
  },
  iconContainer: {
    flexDirection: 'column',
  },
  icon: {
    marginRight: 10,
    fontSize: 30
  },
  invertedIcon: {
    transform: [{ rotate: '-90deg' }],
  },
  input: {
    flex: 1,
    fontSize: 39,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 90,
    width: "50%",
    alignItems: "center",
  },
  timePickerContainer: {
    width: '100%',
    height: 40,
    borderColor: '#D3D3D3',
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
    justifyContent: 'flex-end',
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
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  durationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  durationInputText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  hourOption: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  hourOptionText: {
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
  customHoursInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    width:"90%",
    marginLeft:12
  },
  // label:{
  //   marginLeft:10
  // }
  marginBottom: {
    marginBottom: 26, // Adjust the margin value as needed
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  
});

export default OfferScreen;