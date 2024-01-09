import React, { useState,useEffect } from "react";
import { AppSafeAreaView, AppScrollView } from "../../components/AppViews";
import PageHeader from "@src/components/PageHeader";
import { MediumText } from "@src/components/AppText";
import AppButton from "@src/components/AppButton";
import { Checkbox } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default UploadScreen = () => {
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null); // Store the label for display
    const navigation = useNavigation();
    const [selectedFormData, setSelectedFormData] = useState(null); 
    const [itemSaved, setItemSaved] = useState(false);

    useEffect(() => {
      checkSavedItem();
    }, []);

    const handleDocumentSelection = (document) => {
        setSelectedDocument(document.id); // Store the ID of the selected document
        setSelectedLabel(document.label); // Store the label for display
        setSelectedFormData(document.formData);
      };

      const saveDocumentSelection = async () => {
        try {
          if (selectedDocument) {
            await AsyncStorage.setItem('selectedDocument', selectedDocument);
            const expirationDate = new Date().getTime() + 365 * 24 * 60 * 60 * 1000;
            await AsyncStorage.setItem('expirationDate', expirationDate.toString());
          }
        } catch (error) {
          console.error(error);
        }
      };
      

      const handleNext = async () => {
        if (selectedDocument) {
          const selectedDoc = documentData.find((doc) => doc.id === selectedDocument);
          if (selectedDoc) {
            await saveDocumentSelection();
            navigation.navigate(selectedDoc.endpoint);
          }
        }
      };
      

      const checkSavedItem = async () => {
        try {
          const savedItem = await AsyncStorage.getItem('selectedDocument');
          if (savedItem) {
            setItemSaved(true);
          }
        } catch (error) {
          console.error(error);
        }
      };
  


  const documentData = [
  //   { id: '1', label: 'National Passport with Face', endpoint: 'NationalPass',
   
  //   },
  //   { id: '2', label: 'Voters Card', endpoint: 'VotersCard',
   
  // },
    { id: '1', label: 'NIN and Virtual NIN', endpoint: 'Vnin',
    },
    { id: '2', label: 'BVN', endpoint: 'Bvn',
 },
//     { id: '5', label: 'Drivers license', endpoint: 'DriversLic',
// },
  ];

  const renderCheckbox = (document) => (
    <Checkbox.Item
      key={document.id}
      label={document.label}
      status={
        selectedDocument === document.id ? 'checked' : itemSaved ? 'checked' : 'unchecked'
      }
      disabled={itemSaved}
      onPress={() => handleDocumentSelection(document)}
    />
  );

    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared successfully.');
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
      }
    };

  return (
    <AppSafeAreaView>
      <PageHeader title={"Upload ID"} />
      <AppScrollView>
        <MediumText style={{ textAlign: "center", marginTop: 20 }}>
          Select a document to verify:
        </MediumText>
        {documentData.map((document) => renderCheckbox(document))}
        <AppButton label="Next" onPress={handleNext} />
        <AppButton  label="Clear AsyncStorage" onPress={clearAsyncStorage} />
      </AppScrollView>
    </AppSafeAreaView>
  );
};
