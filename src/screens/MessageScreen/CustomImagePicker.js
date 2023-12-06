import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CustomImagePicker = ({ onSelectImage }) => {
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission to access media library was denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Handle selected assets
      const selectedAssets = result.assets;
      if (selectedAssets.length > 0) {
        const selectedAsset = selectedAssets[0];
        const imageURI = selectedAsset.uri;

        // Pass the image URI to the parent component
        onSelectImage(imageURI);
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleImagePicker}>
      <FontAwesome name="picture-o" size={30} color="blue" />
    </TouchableOpacity>
  );
};

export default CustomImagePicker;
