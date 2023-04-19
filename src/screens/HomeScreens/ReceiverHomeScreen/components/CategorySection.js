import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { AppSectionView } from "../../../../components/AppViews";
import {
  LargeText,
  MediumText,
  SmallText,
} from "../../../../components/AppText";
import AppSearchInput from "../../../../components/AppSearchInput";
import useTheme from "@src/hooks/useAppTheme";

import {search} from "@src/redux/searchSlice";

export default CategorySection = () => {
  const { theme } = useTheme();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSearch = () => {
    Keyboard.dismiss();
    dispatch(search(query));
  };

  const categories = [
    {
      name: "General",
      navigate: "",
    },
    {
      name: "Errand",
      navigate: "",
    },
    {
      name: "Courier",
      navigate: "",
    },
    {
      name: "Ride-Hailing",
      navigate: "",
    },
  ];

  return (
    <AppSectionView>
      <View style={{paddingHorizontal: 20}}>
        <LargeText style={{marginBottom: 10}}>
          Hi, {userInfo?.data?.first_name} 👋
        </LargeText>
        <AppSearchInput value={query} placeholder="Search for a service" onPress={handleSearch} />
      </View>
      <FlatList
        data={categories}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: 20, paddingHorizontal: 20}}
        keyExtractor={(_, i) => i}
        renderItem={({item}) => (
          <TouchableOpacity>
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
              <SmallText style={{color: theme.PRIMARY_TEXT_COLOR}}>
                {item.name}
              </SmallText>
            </View>
          </TouchableOpacity>
        )}
      />
    </AppSectionView>
  );
};
