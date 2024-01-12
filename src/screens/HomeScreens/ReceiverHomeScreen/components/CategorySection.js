import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppSectionView } from "../../../../components/AppViews";
import { LargeText, SmallText, MediumText } from "@src/components/AppText";
// import AppSearchInput from "../../../../components/AppSearchInput";
import useTheme from "@src/hooks/useAppTheme";
import { search } from "@src/redux/searchSlice";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { SIZES } from "@src/constants/theme";
import MyAvatar from "@src/global/MyAvatar";
// import {en, es, ja} from '@src/constants/localization';
import * as Localization from 'expo-localization';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";




const CategorySection = ({ item }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { width, height } = useWindowDimensions();
  const { t} = useTranslation();

  const [searchQuery, setSearchQuery] = useState(""); // Corrected variable name
  const [searchResults, setSearchResults] = useState([]); // Added state for search results

  useEffect(() => {
    console.log("Query:", searchQuery); // Corrected variable name
  }, [searchQuery]); // Corrected variable name

  const handleSearch = async () => {
    Keyboard.dismiss();
    console.log(searchQuery);
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.decmark.com/v1/user/services/search?search=${searchQuery}`
      );
      const data = response.data.services.data;
      console.log("API Response:", data);
      setSearchResults(data);
    } catch (error) {
      console.log("Error fetching search:", error);
      setSearchResults([]); // Set empty array in case of error or empty response
    } finally {
      setLoading(false);
    }
  };
  
  const categories = [
    {
      name: `${t('general')}`,
      Path: "GeneralScreen",
    },
    {
      name: `${t('errand')}`,
      Path: "ErrandScreen",
    },
    {
      name: `${t('courier')}`,
      Path: "CourierScreen",
    },
    // {
    //   name: "Ride-Hailing",
    //   Path: "RideMapScreen",
    // },
  ];

  const navigateToScreen = (screenName) => {
    if (screenName === "RideMapScreen") {
      navigation.navigate("ProfileStack", { screen: "RideMapScreen" });
    } else if (screenName === "CourierScreen") {
      navigation.navigate("ProfileStack", { screen: "CourierScreen" });
    } else if (screenName === "ErrandScreen") {
      navigation.navigate("ProfileStack", { screen: "ErrandScreen" });
    } else {
      navigation.navigate(screenName);
    }
  };

  const SearchResults = ({ data }) => {
    const { theme } = useTheme();
    const { t} = useTranslation();
    
    return (
      <View style={{ paddingHorizontal: 20 }}>
        {data.map((result) => (
          <TouchableOpacity
            key={result.id}
            onPress={() =>
              navigation.navigate("ProfileStack", {
                screen: "ProviderProfileScreen",
                
                params: {
                  id:result.id,
                  user_id:result.user_id,
                  price:result.price,
                  name: result.user.first_name,
                  image:result.user.profile_img,
                  description: result.description,
                  type: result.type,
                  coordinate: result.coordinate,
                  providerType: result.type,
                  created_at:  result.created_at,
                  ratingScore:  result.ratingScore,
                  ratingReviews:  result.ratingReviews,
                }
              })
            }
          >
            <View
               style={{
                width: width - 50,
                marginTop: 15,
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
              <View style={{ flexDirection: "row", marginRight:12 }}>
                <View style={{ flexDirection: "row", marginRight:12 }}>
                <MyAvatar size={40} iconSize={10} image={result.user.image} />
                  <View style={{ flexDirection: "row", marginRight:12, marginTop:10, marginLeft:7}}>
                        
                        <SmallText style={{ color: theme.PRIMARY_TEXT_COLOR, marginRight:12 }}>
                        {result.user.first_name}
                      </SmallText>
                      <SmallText style={{ color: theme.PRIMARY_TEXT_COLOR }}>
                        {result.user.last_name}
                      </SmallText>
                  </View>
                  <View style={{ flexDirection: "row",marginTop:10}}>
                        <MediumText
                            style={{
                              color: theme.PRIMARY_TEXT_COLOR,
                            }}
                          >
                        ₦{result.price}
                      </MediumText>
                  </View>
                 
                </View>

                <View style={{ flexDirection: "row",marginTop:10}}>
                  <SmallText style={{ color: theme.PRIMARY_TEXT_COLOR }}>
                    {result.type}
                  </SmallText>
                  {/* <SmallText style={{ color: theme.PRIMARY_TEXT_COLOR }}>
                    {result.description}
                  </SmallText> */}
                </View>

                {/* <View style={{ flexDirection: "row",}} >
                    <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "60%",
                    }}
                  >
                    <Ionicons
                      name="home-outline"
                      size={20}
                      color={theme.gold}
                    />
                    <SmallText
                      numberOfLines={1}
                      style={{
                        color: theme.PRIMARY_TEXT_COLOR,
                        marginLeft: 1,
                      }}
                    >
                      {result.user.coordinate}
                      
                    </SmallText>
                    </View>

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
                      }}
                    >
                      {result.user.coordinate}
                      
                    </SmallText>
                    </View>
                </View> */}
                  
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  
  return (
    <AppSectionView>
      <View style={{ paddingHorizontal: 20 }}>
        <LargeText style={{ marginBottom: 10 }}>
          {/* Hi, {userInfo?.data?.id} 👋 */}
          {t('hello')}, {userInfo?.data?.first_name} 👋
        </LargeText>
        <View style={styles.inputContainer}>
          <TextInput
            value={searchQuery} // Corrected variable name
            placeholder={t('search')}
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={(query) => setSearchQuery(query)} // Corrected variable name
            placeholderTextColor={theme.SECONDARY_TEXT_COLOR}
            style={{
              flex: 1,
              height: "100%",
              fontSize: 16,
              color: theme.PRIMARY_TEXT_COLOR,
              fontFamily: "SourceSansPro-Regular",
              borderColor: theme.PRIMARY_BORDER_COLOR,
            }}
          />
          <TouchableOpacity
            onPress={handleSearch}
            style={{
              backgroundColor: theme.gold,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              width: 40,
              height: 40,
              marginLeft: 8,
            }}
          >
            <Ionicons name="search-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={categories}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 10, paddingHorizontal: 20 }}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigateToScreen(item.Path)}
            key={item.name}
          >
            <View
              style={{
                backgroundColor: theme.INPUT_BACKGROUND_COLOR,
                padding: 10,
                paddingHorizontal: 16,
                marginRight: 10,
                borderWidth: 1,
                borderRadius: 50,
                borderColor: theme.PRIMARY_BORDER_COLOR,
              }}
            >
              <SmallText style={{ color: theme.PRIMARY_TEXT_COLOR }}>
                {item.name}
              </SmallText>
            </View>
          </TouchableOpacity>
        )}
      />

      {loading ? (
              <View style={{ paddingHorizontal: 20 }}>
                <SmallText>Loading...</SmallText>
              </View>
            ) : (
              !!searchResults && searchResults.length > 0 && <SearchResults data=

{searchResults} />
            )}
    </AppSectionView>
  );


};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
  }
});

export default CategorySection;
