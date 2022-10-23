import { useRef } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";
import { AppScrollView, AppSafeAreaView } from "@src/components/AppViews";
import { MaterialIcons } from "@expo/vector-icons";
import { MediumText, XtraLargeText } from "@src/components/AppText";
import AppButton from "@src/components/AppButton";
import WorkImages from "./components/WorkImages";
import RatingsReviews from "./components/RatingsReviews";
import Bio from "./components/Bio";

export default ProviderProfileScreen = ({ navigation }) => {
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
              style={styles.img(IMG_SIZE)}
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
          onPress={() =>
            navigation.navigate("ServiceStack", {
              screen: "ScheduleServiceScreen",
            })
          }
        />
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
