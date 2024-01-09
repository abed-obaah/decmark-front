import React, {FC, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';
import { AppScrollView, AppSafeAreaView } from "@src/components/AppViews";
import AppButton from '@src/components/AppButton';
import AppTextarea from '@src/components/AppTextarea';
import AppInput from '@src/components/AppInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useNavigation } from "@react-navigation/native";
import { format } from 'date-fns';
import { MaterialIcons } from "@expo/vector-icons";
import { MediumText,ErrorText, XtraLargeText, LargeText } from "@src/components/AppText";
import { useSelector, useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';
import useTheme from "@src/hooks/useAppTheme"
import { COLORS, SIZES } from "@src/constants/theme";
import { Ionicons, Feather } from "@expo/vector-icons";
import useAppTheme from "@src/hooks/useAppTheme";
import { SelectList } from 'react-native-dropdown-select-list'






const ScheduleForm = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalMessageVisible, setModalMessageVisible] = useState(false);
  const [selectedHours, setSelectedHours] = useState(0);
  const [customHours, setCustomHours] = useState('');
  const { theme } = useTheme();
  const [selected, setSelected] = React.useState("");
  const route = useRoute();
  const { id, price, user_id, descriptions, type, providerType, names } = route.params;

  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState('');
  const [coordinate, setCoordinate] = useState([1, 0]);
  const { userInfo } = useSelector((state) => state.auth);
  const [customValue, setCustomValue] = useState('');
  const userId = userInfo?.data?.id;

  const baseUrl = "https://api.decmark.com/v1/user";
  const apiKey = "base64:vhMcjElk3d0BYItZB09fP5MbUEPXH2JRtqW3G5/tKSk=";

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleDateSelection = () => {
    setShowDatePicker(true);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleMessageModal = () => {
    setModalMessageVisible(!isModalMessageVisible);
  };

  const handleHourSelection = (hours) => {
    setSelectedHours(hours);
    setCustomHours('');
    toggleModal();
  };

  const handleCustomHourChange = (text) => {
    setCustomHours(text);
  };

  const formatDate = (date) => {
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  };

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'You can\'t schedule your own service'
    });
  }

  const ScheduleApi = () => {
    const requestBody = {
      dueDate: selectedDate ? formatDate(selectedDate) : null,
      description: description,
      coordinate: coordinate,
      price: price,
      times: selectedHours,
      user_id: userId,
      service_id: id,
    };
    axios
  .post(`${baseUrl}/services/${id}/schedule`, requestBody, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
  .then((res) => {
    toggleMessageModal();
    // Store `id` and `user_id` in AsyncStorage
    AsyncStorage.setItem('mostRecentScheduleId', id.toString());
    AsyncStorage.setItem('mostRecentScheduleUserId', user_id.toString());
    AsyncStorage.setItem('loggedInUserId', userId.toString());
    console.log('id:', id);
    console.log('user-id:', user_id);
    console.log("userId:", userId);
    console.log("Response:", res.data);
  })
  .catch((err) => {
    console.log("The error is:", err.response);

    if (err.response.status === 403) {
      // Handle 403 Forbidden error
      showToast();
    console.log("Error", "You can't schedule your own service");
    } else {
      // Handle other errors
      // ...
    }
  });
  };

  const [data, setData] = useState([
    { key: '1', value: 'Once a week' },
    { key: '2', value: 'Twice a week' },
    { key: '3', value: 'Thrice a week' },
    { key: '4', value: 'On-off service' },
    { key: '5', value: 'Custom' },
  ]);

  const handleSaveCustom = () => {
    if (customValue.trim() !== '') {
      const customEntry = { key: String(data.length + 1), value: customValue };
      setData([...data.slice(0, data.length - 1), customEntry, data[data.length - 1]]);
      setSelected(customValue);
      setCustomValue('');
    }
  };

  return (
    <AppSafeAreaView>
      <AppScrollView>
        {/* Select Date */}
        {/* <Text style={{ styles.label, color: theme.PRIMARY_TEXT_COLOR,}}>Select Date:</Text> */}
        <Text style={{ color: theme.PRIMARY_TEXT_COLOR }}>Select Date:</Text>

        <TouchableOpacity style={[styles.datePickerContainer, {borderColor: theme.PRIMARY_BORDER_COLOR,}]} onPress={handleDateSelection}>
          {/* <Text style={styles.dateText}>
            {selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd HH:mm:ss') : 'Select a date'}
          </Text> */}
          <Text style={{borderColor: theme.PRIMARY_BORDER_COLOR, color: theme.PRIMARY_TEXT_COLOR,backgroundColor: theme.INPUT_BACKGROUND_COLOR}}>
            {selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd') : 'Select a date'}
            {/* {selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd HH:mm:ss') : 'Select a date'} */}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate ? new Date(selectedDate) : new Date()}
            mode="datetime"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) {
                setSelectedDate(date);
              }
            }}
          />
        )}

        {/* Select Time */}
        <Text style={{ color: theme.PRIMARY_TEXT_COLOR }}>Select Duration:</Text>
        <TouchableOpacity style={[styles.durationInput, { borderColor: theme.PRIMARY_BORDER_COLOR, backgroundColor: theme.INPUT_BACKGROUND_COLOR }]} onPress={toggleModal}>
          <Text style={{ color: theme.PRIMARY_TEXT_COLOR }}>
            {selectedHours ? `${selectedHours} hours` : 'Duration'}
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
                placeholder="Custom Duration (hours)"
                value={customHours}
                onChangeText={handleCustomHourChange}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.hourOption}
                onPress={() => handleHourSelection(parseInt(customHours))}
              >
                <Text style={styles.hourOptionText}>Set Custom Duration</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Message Modal */}
        <Modal visible={isModalMessageVisible} animationType="slide" transparent>
          <View style={styles.MessageModalContainer}>
            <View style={styles.MessageModalContent}>
              <View style={styles.centerTop}>
                <LargeText style={styles.hourOptionText}>Schedule Created Successfully.</LargeText>
                {/* <MaterialIcons name="verified" size={24} color={"green"} /> */}
              </View>
              <View style={styles.content}>
                <XtraLargeText>{names}{" "}</XtraLargeText>
                <View style={styles.providerInfoContainer}>
                  <Text style={styles.providerType}>{providerType}</Text>
                  <Text style={styles.dot}>·</Text>
                  <Text style={styles.descriptions}>{descriptions}</Text>
                </View>
                <Text>{type}</Text>
              </View>
              <TouchableOpacity
                style={styles.hourOption}
                onPress={() => handleHourSelection(parseInt(customHours))}
              >
                <AppButton
                  label="Message"
                  onPress={() =>
                    navigation.navigate("OthersStack", {
                      screen: "ChattingScreen",
                      params: {
                        id: id,
                        price: price,
                        user_id: user_id,
                        descriptions: description,
                        type: type,
                        providerType: providerType,
                        names: names,
                        label: 'Messages'
                      },
                    })
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalMessageVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Rest of the form */}
        <View>
      <Text style={{ color: theme.PRIMARY_TEXT_COLOR }}>How Often:</Text>
      {selected === 'Custom' ? (
        <View>
          <AppInput
            placeholder="Enter custom service"
            value={customValue}
            onChangeText={(text) => setCustomValue(text)}
          />
          <AppButton label="Save" onPress={handleSaveCustom} />
        </View>
      ) : (
        <SelectList boxStyles={{borderColor: theme.PRIMARY_BORDER_COLOR}}setSelected={(val) => setSelected(val)} data={data} save="value" />
      )}
    </View>
        {/* <AppInput label="" value={id ? id.toString() : 'N/A'} editable={false} />
        <AppInput label="" value={userId ? userId.toString() : 'N/A'} editable={false} /> */}
        <AppInput label="Price" value={price} editable={false} />
        <AppInput
          label="Description:"
          value={description}
          onChangeText={(value) => setDescription(value)}
          multiline={true}
          numberOfLines={4}
        />
        <AppTextarea label="Location:" value={coordinate} onChangeText={(value) => setCoordinate(value)} />
        <AppButton label="Schedule" onPress={ScheduleApi} />
      </AppScrollView>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
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
  dateText: {
    fontSize: 16,
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
  MessageModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  MessageModalContent: {
    backgroundColor: 'white',
    paddingVertical: 20,
    height: 300,
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
    width: "90%",
    marginLeft: 12,
  },
  centerTop: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerType: {
    fontSize: 16, // Adjust the font size as needed
    fontWeight: 'bold', // Apply the desired font weight
  },
  dot: {
    fontSize: 16, // Adjust the font size as needed
    marginHorizontal: 5, // Add some spacing around the dot
  },
  descriptions: {
    fontSize: 16, // Adjust the font size as needed
    color: 'gray', // Apply the desired text color
  },
  content:{
    paddingHorizontal: 10,
  }
});

export default ScheduleForm;
