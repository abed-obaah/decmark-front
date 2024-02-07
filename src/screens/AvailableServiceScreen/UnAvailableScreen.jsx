import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { LargeText, MediumText,SmallText } from "@src/components/AppText";
import AppButton from "@src/components/AppButton";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import { useNavigation } from "@react-navigation/native";

const UnAvailableScreen = () => {
    const navigation = useNavigation();
  return (
    <AppSafeAreaView>
      <AppScrollView>
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/danger.png")}
            style={styles.image}
          />

          <MediumText style={styles.largeText}>
            The Service is UnAvailable
          </MediumText>

          <SmallText style={styles.mediumText}>
            Please start the service or try again later.
          </SmallText>

          {/* <View style={styles.buttonContainer}>
            <AppButton
              label="Go Back"
              onPress={() =>
                navigation.navigate("ProfileStack", {
                  screen: "MenuScreen",
                })
              }
              
            />
          </View> */}
          
        </View>
      </AppScrollView>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop:60
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  largeText: {
    fontSize: 24,
    marginTop: 20,
  },
  mediumText: {
    fontSize: 18,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "70%", // Adjust the width as per your requirements
  },
});

export default UnAvailableScreen;
