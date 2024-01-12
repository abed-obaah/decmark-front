import { useRef, FC } from "react";
import { View, Image, Modal, Animated, StyleSheet,Text, TouchableOpacity, Alert } from "react-native";
import { AppScrollView, AppSafeAreaView } from "@src/components/AppViews";
import { MaterialIcons } from "@expo/vector-icons";
import { MediumText, XtraLargeText } from "@src/components/AppText";
import AppButton from "@src/components/AppButton";
import WorkImages from "./components/WorkImages";
import RatingsReviews from "./components/RatingsReviews";
import Bio from "./components/Bio";
import AppBottomSheet from "@src/components/ui/BottomSheet";
import useBottomSheet from "@src/hooks/useBottomSheet";
import { useNavigation } from "@react-navigation/native";
import AppInput from "@src/components/AppInput";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import MyAvatar from "@src/global/MyAvatar";
import Lightbox from 'react-native-lightbox';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";

const ProviderProfileScreen = () => {
  const navigation = useNavigation();
  const { sheetRef, handleSnapPress } = useBottomSheet();
  const scrollY = useRef(new Animated.Value(0)).current;
  const IMG_SIZE = 200;
  const { t} = useTranslation();
  const imgSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [IMG_SIZE, IMG_SIZE / 2],
    extrapolate: "clamp",
  });
  const route = useRoute();
  const { 
    id, 
    name, 
    image,
    description, 
    type, 
    coordinate,
    providerType,
    created_at,
    ratingScore,
    ratingReviews,
    user_id,
    price} = route.params;




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
            {/* <Image
              source={require("@src/assets/images/my_avatar.png")}
              style={styles.img(IMG_SIZE) as any}
            /> */}
            {/* <Lightbox underlayColor="white" >
            <Image
              style={styles.img(IMG_SIZE) as any}
              resizeMode="cover"
               source={{ uri: image }}
            />
          </Lightbox> */}
             <MyAvatar size={200} iconSize={10} image={image}
             />
          </Animated.View>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <XtraLargeText>
          {name}{" "}
            <MaterialIcons name="verified" size={24} color={"green"} />
          </XtraLargeText>
          <MediumText>{t('general')} {t('services')} &bull; {type}</MediumText>
        </View>
        <Bio 
          description={description}
          coordinate={coordinate}
          providerType={providerType}
          created_at={created_at}
          
        />
        <RatingsReviews
          ratingScore={ratingScore}
          ratingReviews={ratingReviews} name={name} type={type}
          />

        <WorkImages />
        {/* <AppButton
          label="Schedule"
          marginTop={20}
          buttonHeight={45}
          onPress={() => handleSnapPress(0)}
        /> */}

<AppButton
              // style={{
              //   backgroundColor: "#DEB253",
              //   paddingHorizontal: 20,
              //   paddingVertical: 10,
              //   borderRadius: 5,
              //   marginTop: 30,
              // }}
              buttonHeight={45}
              marginTop={20}
              label={t('schedule')}
              onPress={() =>
                
                navigation.navigate("ProfileStack", {
                  screen: "ScheduleScreen",
                  params: {
                    id: id,
                    price:price,
                    user_id:user_id,
                    descriptions:description,
                    type:type,
                    providerType:providerType,
                    names:name,
                    // imgUrls:imgUrls,
                  },
                })
              }
            />

      </AppScrollView>
      <AppBottomSheet sheetRef={sheetRef}>
        <AppInput label={t('here')} />
      </AppBottomSheet>
    </AppSafeAreaView>
  );
};

export default ProviderProfileScreen;

const styles = StyleSheet.create({
  imgContainer: (imgSize: any, IMG_SIZE: any, scrollY: any) => ({
    height: imgSize,
    width: imgSize,
    marginTop: scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, IMG_SIZE / 2],
      extrapolate: "clamp",
    }),
  }),
  img: (IMG_SIZE: any) => ({
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: IMG_SIZE / 2,
  }),
});
