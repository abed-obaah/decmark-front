import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { AppSectionView } from "../../../../components/AppViews";
import { LargeText, MediumText } from "../../../../components/AppText";
import AppSearchInput from "../../../../components/AppSearchInput";
import useTheme from "@src/hooks/useAppTheme";

export default CategorySection = () => {
  const { theme } = useTheme();
  const { userInfo } = useSelector((state) => state.auth);

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
      <View style={{ paddingHorizontal: 20 }}>
        <LargeText style={{ marginBottom: 10 }}>
          Hi, {userInfo?.data?.first_name} 👋
        </LargeText>
        <AppSearchInput placeholder="Search for a service" />
      </View>
      <FlatList
        data={categories}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 10, paddingHorizontal: 20 }}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: theme.INPUT_BACKGROUND_COLOR,
                padding: 5.5,
                paddingHorizontal: 12,
                marginRight: 5.5,
                borderWidth: 1,
                borderRadius: 50,
                borderColor: theme.PRIMARY_BORDER_COLOR,
              }}
            >
              <MediumText style={{ color: theme.PRIMARY_TEXT_COLOR }}>
                {item.name}
              </MediumText>
            </View>
          </TouchableOpacity>
        )}
      />
    </AppSectionView>
  );
};
