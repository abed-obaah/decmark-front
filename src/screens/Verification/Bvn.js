import React, { useState } from "react";
import { View, Text, TextInput, Modal, Button, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from 'axios';
import { AppSafeAreaView, AppScrollView } from "../../components/AppViews";
import AppButton from '@src/components/AppButton';
import PageHeader from "@src/components/PageHeader";
import AppTextarea from '@src/components/AppTextarea';
import AppInput from '@src/components/AppInput';

const Bvn = () => {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [failedModalVisible, setFailedModalVisible] = useState(false);
 

  const handleVerifyVotersCard = async () => {
    try {
      setLoading(true);
      const options = {
        method: 'POST',
        url: 'https://api.prembly.com/identitypass/verification/bvn',
        headers: {
          accept: 'application/json',
          'x-api-key': 'sandbox_sk_OcrtOg911Aidwis8V8tBHlOW07ly3KyoiN8ozdR',
          'app-id': 'ca5723ac-c310-4279-bb08-23a40816f3d5',
          'content-type': 'application/json'
        },
        data: {
          number: number
        }
      };

      const response = await axios(options);
      console.log(response.data); // Handle the response here
      if (response.data && response.data.status === false) {
        // If verification failed
        setFailedModalVisible(true);
      } else {
        
        setModalVisible(true);
      }
      // Handle success or further actions based on the response
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
      <PageHeader title={"Bvn"} />
      <AppScrollView>

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

            <View>
            <AppInput label="Number"
                      value={number}
                      onChangeText={text => setNumber(text)}
                  />
          
            {/* Add more input fields for lga, state, number if needed */}
            <AppButton label="Verify Voters Card" onPress={handleVerifyVotersCard}/>
            

            {loading && (
              <View>
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
  },

  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
export default Bvn;
