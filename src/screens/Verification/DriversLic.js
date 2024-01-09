import React, { useState } from "react";
import { View, Text, TextInput, Modal, Button, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AppSafeAreaView, AppScrollView } from "../../components/AppViews";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AppInput from "@src/components/AppInput";
import PageHeader from "@src/components/PageHeader";
import AppButton from '@src/components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriversLic = () => {
  const [number, setNumber] = useState('');
  const [image, setImage] = useState(null);
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [failedModalVisible, setFailedModalVisible] = useState(false);

  const handleVerifyDocument = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('dob', dob);
      formData.append('number', number);
      formData.append('image', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpg',
      });

      const options = {
        method: 'POST',
        url: 'https://api.prembly.com/identitypass/verification/drivers_license/face',
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': 'sandbox_sk_OcrtOg911Aidwis8V8tBHlOW07ly3KyoiN8ozdR',
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
      console.log(result.uri)
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setFailedModalVisible(false);
  };

  return (
    <AppSafeAreaView>
      <PageHeader title={"Drivers license"} />
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

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <AppInput
            label="FRSC Number"
            value={number}
            onChangeText={setNumber}
           />

            <AppInput
            label="Date of birth(e.g 1998-09-21)"
            value={dob}
            onChangeText={text => setDob(text)}
           />

          <TouchableOpacity onPress={pickImage}>
                <AppInput
                  label="Choose Image"
                  value={image ? "Image Selected" : ""}
                  editable={false}
                />
            </TouchableOpacity>
                      <View style={styles.inputContainer}>
                  {image && (
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: image }} style={styles.image} />
                    </View>
                  )}
          </View>
          </View>
          <AppButton label="Verify Document" onPress={handleVerifyDocument}/>
          {loading && (
            <View style={styles.loadingContainer}>
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
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },


});

export default DriversLic;
