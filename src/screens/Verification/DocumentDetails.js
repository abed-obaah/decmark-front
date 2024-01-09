import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Modal, Button,  ActivityIndicator } from "react-native";
import { AppSafeAreaView, AppScrollView } from "../../components/AppViews";
import PageHeader from "@src/components/PageHeader";
import AppButton from "@src/components/AppButton";
import axios from 'axios';

const DocumentDetails = ({ route }) => {
  const { document, endpoint, formData,updateFormFields} = route.params;
  const checkedLabel = route.params.checkedLabel || 'Unknown';
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
    const [failedModalVisible, setFailedModalVisible] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [formFields, setFormFields] = useState({ ...formData });

  const handleVerifyDocument = async () => {
    try {
        setLoading(true);
      const options = {
        method: 'POST',
        url: `https://api.prembly.com/identitypass/verification/${endpoint}`,
        headers: {
          accept: 'application/json',
          'x-api-key': 'sandbox_sk_OcrtOg911Aidwis8V8tBHlOW07ly3KyoiN8ozdR',
          'app-id': 'ca5723ac-c310-4279-bb08-23a40816f3d5',
          'content-type': 'multipart/form-data'
        },
        data: document.formData
      };

      const response = await axios(options);
      console.log(response.data);
    //   setModalVisible(true);
      if (response.data && response.data.status === false) {
        // If verification failed
        setFailedModalVisible(true);
      } else {
        setResponseData(response.data);
        setModalVisible(true);
      }
    //   setLoading(false);
    } catch (error) {
      console.error(error);
    }finally {
        setLoading(false);
      }
  };

  const closeModal = () => {
    setModalVisible(false);
    setFailedModalVisible(false);
  };

  const handleFieldChange = (fieldName, value) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
    // Update form data in the parent component (if available)
    if (updateFormFields) {
      updateFormFields({ ...formFields, [fieldName]: value });
    }
  };

  useEffect(() => {
    // Call the function to update form fields when the component mounts
    if (updateFormFields && formData) {
      updateFormFields(formData);
    }
  }, [updateFormFields, formData]);

  const renderFormInputs = () => {
    return Object.entries(formFields).map(([fieldName, fieldValue]) => (
      <View key={fieldName} style={{ marginVertical: 10 }}>
        <Text>{fieldName}</Text>
        <TextInput
          value={fieldValue}
          onChangeText={(text) => handleFieldChange(fieldName, text)} // Handle input changes
          style={{ borderWidth: 1, padding: 5 }}
        />
      </View>
    ));
  };

  
  

  return (
    <AppSafeAreaView>
      <PageHeader title={"Document Details"} />
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

      <AppScrollView>
        
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Document Type: {checkedLabel}
            endpoint: {endpoint}
          </Text>
          {renderFormInputs()}
        </View>
        <AppButton label="Verify Document" onPress={handleVerifyDocument} />
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default DocumentDetails;
