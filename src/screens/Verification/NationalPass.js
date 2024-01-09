import React, { useState } from "react";
import { View, Text, TextInput, Modal, Button, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from 'axios';
import { AppSafeAreaView, AppScrollView } from "../../components/AppViews";
import AppButton from '@src/components/AppButton';
import PageHeader from "@src/components/PageHeader";
import AppTextarea from '@src/components/AppTextarea';
import AppInput from '@src/components/AppInput';

const NationalPass = () => {
  const [last_name, setLastName] = useState('');
  const [number, setNumber] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [failedModalVisible, setFailedModalVisible] = useState(false);

  const handleVerifyDocument = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('last_name', last_name);
      formData.append('number', number);
      formData.append('image', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpg',
      });

      const options = {
        method: 'POST',
        url: 'https://api.prembly.com/identitypass/verification/national_passport_with_face',
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': 'live_sk_SkGMDub46Q1iLSTh1nQHpLYstN5khJvxBxsh4oG',
          'app-id': 'ca5723ac-c310-4279-bb08-23a40816f3d5',
        },
        data: formData,
      };

      const response = await axios(options);
      console.log(response.data);

      // Handle success response here

    } catch (error) {
      console.error(error);
      // Handle error here
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setFailedModalVisible(false);
  };

  return (
    <AppSafeAreaView>
      <PageHeader title={"International Passport"} />
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
      
        <View style={{ padding: 20 }}>
           <AppInput label="Last Name"
                         value={last_name}
                         onChangeText={setLastName}
                  />
          <AppInput label="Number:"
                         value={number}
                         onChangeText={setNumber}
                  />

          <TouchableOpacity onPress={pickImage}>
            <Text>Choose Image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
                
                <AppButton label="Verify Document" onPress={handleVerifyDocument}/>
        {loading && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default NationalPass;
