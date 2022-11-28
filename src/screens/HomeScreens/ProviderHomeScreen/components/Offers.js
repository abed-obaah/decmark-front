import { View, FlatList } from "react-native";
import { SmallText, MediumText } from "@src/components/AppText";
import AppButton from "@src/components/AppButton";
import { SIZES } from "@src/constants/theme";
import useTheme from "@src/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default Offers = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const offers = [
    {
      name: "Helen Njokwu",
      category: "Health",
      price: "40,500",
      description:
        "Hi John! I am looking for a home massage, will you be available on Saturday by 6pm? 😉",
      time: "45 mins ago",
      location: "Ogba, Lagos",
    },
    {
      name: "Helen Njokwu",
      category: "Health",
      price: "40,500",
      description:
        "Hi John! I am looking for a home massage, will you be available on Saturday by 6pm? 😉",
      time: "45 mins ago",
      location: "Ogba, Lagos",
    },
    {
      name: "Helen Njokwu",
      category: "Health",
      price: "40,500",
      description:
        "Hi John! I am looking for a home massage, will you be available on Saturday by 6pm? 😉",
      time: "45 mins ago",
      location: "Ogba, Lagos",
    },
  ];

  const Offer = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "transparent",
          width: "100%",
          marginBottom: 20,
          borderWidth: 1,
          borderRadius: SIZES.radius,
          borderColor: theme.PRIMARY_BORDER_COLOR,
        }}
      >
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View>
              <MediumText
                numberOfLines={1}
                style={{
                  color: theme.PRIMARY_TEXT_COLOR,
                  // fontFamily: "FONT_SEMI_BOLD",
                }}
              >
                {item.name}
              </MediumText>
              <MediumText>{item.category}</MediumText>
            </View>
            <View>
              <MediumText
                style={{
                  color: theme.PRIMARY_TEXT_COLOR,
                  // fontFamily: "FONT_SEMI_BOLD",
                }}
              >
                ₦{item.price}
              </MediumText>
            </View>
          </View>
          <SmallText>{item.description}</SmallText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Ionicons name="time-outline" size={20} color={theme.gold} />
            <SmallText
              numberOfLines={1}
              style={{
                color: theme.PRIMARY_TEXT_COLOR,
                marginLeft: 1,
              }}
            >
              {item.time}
            </SmallText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Ionicons name="location-outline" size={20} color={theme.gold} />
            <SmallText
              numberOfLines={1}
              style={{
                color: theme.PRIMARY_TEXT_COLOR,
                marginLeft: 1,
              }}
            >
              {item.location}
            </SmallText>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
            }}
          >
            <AppButton
              label="Review & Accept Offer"
              marginTop={0.5}
              buttonHeight={45}
              onPress={() =>
                navigation.navigate("ServiceStack", {
                  screen: "OfferDetailScreen",
                })
              }
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={offers}
      bounces={false}
      contentContainerStyle={{ marginTop: 15, paddingHorizontal: 20 }}
      keyExtractor={(_, i) => i}
      renderItem={({ item }) => <Offer item={item} />}
    />
  );
};
