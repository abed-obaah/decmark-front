import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LargeText, SmallText, MediumText } from "@src/components/AppText";
import { AppSectionView } from "@src/components/AppViews";
import useTheme from "@src/hooks/useAppTheme";
import services from "../constants/services";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";

export default PopularServices = () => {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { t} = useTranslation();


  return (
    <AppSectionView style={{ paddingHorizontal: 20 }}>
      <LargeText style={{ marginVertical: 5 }}>{t('popularServices')}</LargeText>
      <View style={styles.boxContainer}>
        {services.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.box}
            onPress={() =>
              navigation.navigate("ServiceStack", {
                screen: "AvailableServiceScreen",
                params: { service: item.label },
              })
            }
          >
            <>
              <Image
                source={item.image}
                style={{
                  width: "100%",
                  height: (width - 40) * 0.23,
                  resizeMode: "cover",
                  borderRadius: 10,
                }}
              />
              <SmallText
                style={{
                  textAlign: "center",
                  marginTop: 5,
                  color: theme.PRIMARY_TEXT_COLOR,
                }}
              >
                 {t(item.label)}
              </SmallText>
            </>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.box}
        onPress={() =>
          navigation.navigate("ServiceStack", {
            screen: "MoreServices",
          })}>
          <View
          
            style={{
              width: "100%",
              height: (width - 40) * 0.23,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
              borderWidth: 1,
              borderColor: theme.PRIMARY_BORDER_COLOR,
            }}
          >
            <SmallText style={{ color: theme.PRIMARY_TEXT_COLOR }}
             onPress={() =>
              navigation.navigate("ServiceStack", {
                screen: "MoreServices",
              })
            }>
             {t('more')}
            </SmallText>
          </View>
        </TouchableOpacity>
      </View>
    </AppSectionView>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  box: {
    width: "23%",
    marginBottom: 10,
  },
});
