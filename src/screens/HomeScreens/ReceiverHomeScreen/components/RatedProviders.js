import React, { useEffect, useState } from "react";
import { Image, View, FlatList, useWindowDimensions } from "react-native";
import { LargeText, SmallText, MediumText } from "@src/components/AppText";
import AppButton from "@src/components/AppButton";
import { SIZES } from "@src/constants/theme";
import useTheme from "@src/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { AppSectionView } from "@src/components/AppViews";
import providers from "../constants/providers";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@src/hooks/useAppStore";
import MyAvatar from "@src/global/MyAvatar";

const StarRating = ({ rating, size, color, style }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons
          key={i}
          name="star"
          size={size}
          color={color}
          style={{ marginRight: 2, fontSize: size }}
        />
      );
    }

    // Render half star if applicable
    if (hasHalfStar) {
      stars.push(
        <Ionicons
          key={fullStars}
          name="star-half"
          size={size}
          color={color}
          style={{ marginRight: 2 }}
        />
      );
    }

    // Render empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={fullStars + i + 1}
          name="star-outline"
          size={size}
          color={color}
          style={{ marginRight: 2 }}
        />
      );
    }

    return stars;
  };

  return <View style={[{ flexDirection: "row" }, style]}>{renderStars()}</View>;
};

const RatedProviders = () => {
  const { width, height } = useWindowDimensions();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [providers, setProviders] = useState([]);
    const { userInfo } = useAppSelector((state) => state.auth);
 

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await axios.get(
        "https://api.decmark.com/v1/user/providers/most_rated"
      );
      const data = response.data.data;
      console.log(data);
      setProviders(data);
    } catch (error) {
      console.log("Error fetching providers:", error);
    }
  };

  
  const ProviderSlide = ({ item }) => {
    const {
      id,
      title,
      price,
      description,
      location,
      type,
      coordinate,
      provider,
      providerType,
      created_at,
      ratings,
      user_id,
      profile_img
    } = item;

    const ratingScore = ratings.length > 0 ? ratings[0].score : 0;
    const ratingReviews = ratings.length > 0 ? ratings[0].review : 'No reviews yet';

    return (
      <View
        style={{
          width: width - 50,
          height:150,
          marginBottom: 0,
          marginRight:10,
          borderWidth: 1,
          borderRadius: SIZES.radius,
          borderColor: theme.PRIMARY_BORDER_COLOR,
          padding: 10,
          color: "black",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 1,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MyAvatar size={50} iconSize={10} image={provider.image} />
          <View style={{ flex: 1,marginLeft:20}}>
            <MediumText
              numberOfLines={1}
              style={{
                color: theme.PRIMARY_TEXT_COLOR,
                flexShrink: 1,
                fontWeight:"bold"
               
              }}
            >
              {provider.name}
              
            </MediumText>
            <MediumText
             style={{
             
              flexShrink: 1,
              fontWeight:"bold"
             
            }}>{type}</MediumText>
            
          </View>

          <View>
            <MediumText
              style={{
                color: theme.PRIMARY_TEXT_COLOR,
                fontWeight:"bold",
              }}
            >
              NGN {price}
            </MediumText>
            <StarRating
              rating={ratingScore}
              size={10}
              color="gold"
              style={{ marginTop: 2,
              width:10,
              height:10 }}
            />
          </View>
        </View>

        <View style={{ padding: 5, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 10,
            }}
          ></View>
          <SmallText
          style={{
            marginLeft: 65,
            fontWeight:"bold"
          }}>{description}</SmallText>
          {/* <SmallText>{provider.image}</SmallText>
          <SmallText>{id}</SmallText>
          <SmallText>{user_id}</SmallText> */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "60%",
              }}
            >
              <Ionicons
                name="location-outline"
                size={20}
                color={theme.gold}
              />
              <SmallText
                numberOfLines={1}
                style={{
                  color: theme.PRIMARY_TEXT_COLOR,
                  marginLeft: 1,
                  fontWeight:"bold"
                }}
              >
                {coordinate}
                {ratingScore}
              </SmallText>
            </View>
            <AppButton
              label="Hire"
              marginTop={0.5}
              buttonHeight={40}
              onPress={() =>
                navigation.navigate("ProfileStack", {
                  screen: "ProviderProfileScreen",
                  params: {
                    id: id,
                    user_id:user_id,
                    price:price,
                    name: provider.name,
                    image: provider.image,
                    description: description,
                    type: type,
                    coordinate: coordinate,
                    providerType: providerType,
                    created_at: created_at,
                    ratingScore: ratingScore,
                    ratingReviews: ratingReviews,
                  }
                })
              }
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <AppSectionView>
      <LargeText style={{ paddingHorizontal: 20, fontSize: 20 }}>
        Most Rated Providers
      </LargeText>
      <FlatList
        data={providers}
        horizontal
        bounces={true}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ marginVertical: 10, paddingHorizontal: 20 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ProviderSlide item={item} />}
      />
    </AppSectionView>
  );
};

export default RatedProviders;
