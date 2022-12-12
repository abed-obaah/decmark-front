import { useRef, FC } from "react";
import { View, Image, Modal, Animated, StyleSheet } from "react-native";
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

const ProviderProfileScreen = () => {
  const navigation = useNavigation();
  const { sheetRef, handleSnapPress } = useBottomSheet();
  const scrollY = useRef(new Animated.Value(0)).current;
  const IMG_SIZE = 200;
  const imgSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [IMG_SIZE, IMG_SIZE / 2],
    extrapolate: "clamp",
  });

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
            <Image
              source={require("@src/assets/images/my_avatar.png")}
              style={styles.img(IMG_SIZE) as any}
            />
          </Animated.View>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <XtraLargeText>
            John Adibe{" "}
            <MaterialIcons name="verified" size={24} color={"green"} />
          </XtraLargeText>
          <MediumText>General Services &bull; Plumber</MediumText>
        </View>
        <Bio />
        <RatingsReviews />
        <WorkImages />
        <AppButton
          label="Schedule"
          marginTop={20}
          buttonHeight={45}
          onPress={() => handleSnapPress(0)}
        />
      </AppScrollView>
      <AppBottomSheet sheetRef={sheetRef}>
        <AppInput label="Here" />
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
