import React from "react";
import { View, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LargeText } from "@src/components/AppText";

const imageSources = {
  image1: require("@src/assets/images/repair.jpg"),
  image2: require("@src/assets/images/repair.jpg"),
  image3: require("@src/assets/images/repair.jpg"),
  // Adjust image paths or add more images here
};

const WorkImages = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const imagesArray = Object.keys(imageSources);

  const handleImageClick = (imageKey) => {
    navigation.navigate("ImageView", { selectedImage: imageSources[imageKey] });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <LargeText style={{ marginBottom: 5 }}>Images</LargeText>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => handleImageClick(imagesArray[0])} style={{ width: (width - 50) / 2 }}>
          <Image
            source={imageSources[imagesArray[0]]}
            style={{
              height: 200,
              width: "100%",
              resizeMode: "cover",
              borderRadius: 5,
            }}
          />
        </TouchableOpacity>
        <View style={{ width: (width - 50) / 2, justifyContent: "space-between" }}>
          <TouchableOpacity onPress={() => handleImageClick(imagesArray[1])}>
            <Image
              source={imageSources[imagesArray[1]]}
              style={{
                height: 95,
                width: "100%",
                resizeMode: "cover",
                borderRadius: 5,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImageClick(imagesArray[2])}>
            <Image
              source={imageSources[imagesArray[2]]}
              style={{
                height: 95,
                width: "100%",
                resizeMode: "cover",
                borderRadius: 5,
                marginTop: 10, // Space between second and third image
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WorkImages;
