import React, { useState } from "react";
import { View, Text, TextInput, Modal, Button, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AppSafeAreaView, AppScrollView } from "../../components/AppViews";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AppInput from "@src/components/AppInput";
import PageHeader from "@src/components/PageHeader";
import AppButton from '@src/components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VotersCard = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [failedModalVisible, setFailedModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    number: '',
    last_name: '',
    first_name: '',
    dob: '',
    lga: '',
    state: ''
  });

  const handleInputChange = (key, value) => {
    let updatedValue = value;
  
    if (key !== 'number') {
      updatedValue = value.toLowerCase().trim(); // Convert to lowercase and remove spaces for all fields except 'number'
    } else {
      updatedValue = value.trim(); // Remove spaces for 'number' field
    }
  
    setFormData({
      ...formData,
      [key]: updatedValue
    });
  };
  

  const handleVerifyVotersCard = async () => {
    try {
      setLoading(true);

      const headers = {
        accept: 'application/json',
        'X-Api-Key': 'live_sk_SkGMDub46Q1iLSTh1nQHpLYstN5khJvxBxsh4oG',
        app_id: 'ca5723ac-c310-4279-bb08-23a40816f3d5',
        'content-type': 'application/x-www-form-urlencoded'
      };

      const response = await axios.post('https://api.prembly.com/identitypass/verification/voters_card', new URLSearchParams(formData).toString(), { headers });

      console.log(response.data);

      if (response.data && response.data.status === false) {
        // If verification failed
        setFailedModalVisible(true);
      } else {
        
        setModalVisible(true);
        const saveDocumentSelection = async (selectedDocument) => {
          try {
            await AsyncStorage.setItem('selectedDocument', selectedDocument);
            // Set an expiry date for 365 days from now
            const expirationDate = new Date().getTime() + 365 * 24 * 60 * 60 * 1000;
            await AsyncStorage.setItem('expirationDate', expirationDate.toString());
          } catch (error) {
            // Handle error saving data
            console.error(error);
          }
        };
      }

    } catch (error) {
      console.error(error);
      // Handle error cases here
    } finally {
      setLoading(false);
    }
  };


  const closeModal = () => {
    setModalVisible(false);
    setFailedModalVisible(false);
  };

  return (
    <AppSafeAreaView>
    <PageHeader title={"Voters card"} />
    <AppScrollView>
    <View style={styles.container}>

<Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              width: "80%", // Width of the modal content
              borderRadius: 10,
              elevation: 5, // For Android shadow
              shadowColor: "#000", // For iOS shadow
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Success!</Text>
            <Text>Your document has been verified.</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={failedModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              width: "80%",
              borderRadius: 10,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              alignItems: "center",
            }}
          >
           <Text style={{ fontSize: 18, marginBottom: 10 }}>Verification failed!</Text>
            <Text>Record not found.</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>

       <AppInput
                label="Voters Card Number"
                value={formData.number}
                onChangeText={text => handleInputChange('number', text)}
              />
     
       <AppInput
                label="Last Name"
                value={formData.last_name}
                onChangeText={text => handleInputChange('last_name', text)}
              />
     
       <AppInput
                label="First Name"
                value={formData.first_name}
                onChangeText={text => handleInputChange('first_name', text)}
              />
     
       <AppInput
                label="Date of Birth (YYYY-MM-DD)"
                value={formData.dob}
                onChangeText={text => handleInputChange('dob', text)}
              />
     
       <AppInput
                label="L.G.A"
                value={formData.lga}
              onChangeText={text => handleInputChange('lga', text)}
              />
       <AppInput
                label="State"
                value={formData.state}
                onChangeText={text => handleInputChange('state', text)}
              />
    
    
    <AppButton label="Verify Document" onPress={handleVerifyVotersCard}/>
      {/* <Button title="Verify Voters Card" onPress={handleVerifyVotersCard} /> */}
      {loading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 999,
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" /> 
          </View>
        )}
    </View>
    </AppScrollView>
    </AppSafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop:60
  },

  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
export default VotersCard;
