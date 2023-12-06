import { useRef } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";
import { AppScrollView, AppSafeAreaView } from "@src/components/AppViews";
import { MediumText, LargeText, XtraLargeText } from "@src/components/AppText";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AppButton from "@src/components/AppButton";
import useTheme from "@src/hooks/useAppTheme";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import MyAvatar from "@src/global/MyAvatar";




export default OfferDetailScreen = ({ route }) => {
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { userInfo } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const {
    id,
    
    category,
    title,
    price,
    description,
    location,
    type,
    coordinate,
    provider,
    provider: { firstName, lastName,image },
    created_at
  } = route.params;

  const IMG_SIZE = 200;

  const imgSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [IMG_SIZE, IMG_SIZE / 2],
    extrapolate: "clamp",
  });


  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Errand Accepted',
      text2: 'You have accepted the Errand, User will be notified👋'
    });
  }
  

  const handleDeclineOffer = async () => {
  
    const showToasts = () => {
      Toast.show({
        type: 'error',
        text1: 'Errand Accepted',
        text2: 'You have accepted the Errand, User will be notified👋'
      });
    }
    try {
      // Assuming you have the schedule ID
      const scheduleId = id;
      console.log(scheduleId);
  
      const payload = {
        user_id: "cb7411c3-134d-429b-9ddc-237c6796120a",
        action: "decline",
      };
  
      const response = await fetch(`https://api.decmark.com/v1/user/errand/errands/${scheduleId}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userInfo?.authentication.token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Success:', responseData);
        showToasts();
        navigation.goBack();
        
      } else {
        console.error('Error accepting offer:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error accepting offer:', error.message);
    }
  };



  const handleAcceptOffer = async () => {
  
    try {
      // Assuming you have the schedule ID
      const scheduleId = id;
      console.log(scheduleId);
  
      const payload = {
        user_id: "cb7411c3-134d-429b-9ddc-237c6796120a",
        action: "accept",
      };
  
      const response = await fetch(`https://api.decmark.com/v1/user/errand/errands/${scheduleId}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userInfo?.authentication.token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Success:', responseData);
        showToast();
        // Handle success, e.g., navigate to a different screen or update the UI
        // You may also want to fetch updated data from the server after accepting the offer
        // For example, you can navigate to a different screen:
        // navigation.navigate("AcceptedOfferScreen");
        navigation.goBack();
      } else {
        console.error('Error accepting offer:', response.status, response.statusText);
        // Handle the error, e.g., display an error message to the user
        // You may want to add additional error handling based on your application's needs
      }
    } catch (error) {
      console.error('Error accepting offer:', error.message);
      // Handle the error, e.g., display an error message to the user
      // You may want to add additional error handling based on your application's needs
    }
  };
  
  
  
  // const navigateBack = () => {
  //   // Assuming you have the navigation prop from React Navigation
  //   navigation.goBack();
  // };

  return (
    <AppSafeAreaView>
      <AppScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={{ alignItems: "center" }}>
          <Animated.View
            style={styles.imgContainer(imgSize, IMG_SIZE, scrollY)}
          >
            <MyAvatar size={200} iconSize={10} image={provider.image}/>
          </Animated.View>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <XtraLargeText>
            {provider.firstName}{" "} {provider.lastName}
            <MaterialIcons name="verified" size={24} color={"green"} />
          </XtraLargeText>
          <MediumText>Service Receiver</MediumText>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="location-outline"
              size={20}
              color={theme.PRIMARY_TEXT_COLOR}
            />
            <MediumText style={{ marginLeft: 3.5 }}>Ikeja, Lagos</MediumText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="time-outline"
              size={20}
              color={theme.PRIMARY_TEXT_COLOR}
            />
            <MediumText style={{ marginLeft: 3.5 }}>{created_at}</MediumText>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <LargeText>Category</LargeText>
          <MediumText>{type} - {title} </MediumText>
        </View>
        <View style={{ marginTop: 20 }}>
          <LargeText>Budget</LargeText>
          <MediumText>₦{price}</MediumText>
        </View>
        <View style={{ marginTop: 20 }}>
          <LargeText>Description</LargeText>
          <MediumText>
            {description}
          </MediumText>
        </View>
        <View style={{ marginTop: 20 }}>
          <LargeText>Attached Files</LargeText>
          <MediumText>No attached files</MediumText>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 15,
          }}
        >
          <AppButton
            label="Decline"
            background="transparent"
            onPress={() => handleDeclineOffer()}
            marginTop={20}
            buttonHeight={45}
          />

          <View style={{ width: 20 }} />

          <AppButton
           onPress={() => handleAcceptOffer()}
           label="Accept" 
           marginTop={20} 
           buttonHeight={45} />
        </View>
      </AppScrollView>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  imgContainer: (imgSize, IMG_SIZE, scrollY) => ({
    height: imgSize,
    width: imgSize,
    marginTop: scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, IMG_SIZE / 2],
      extrapolate: "clamp",
    }),
  }),
  img: (IMG_SIZE) => ({
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: IMG_SIZE / 2,
  }),
});
