import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppScrollView, AppSafeAreaView } from "@components/AppViews";
import MyAvatar from "../../global/MyAvatar";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "@hooks/useAppTheme";
import { MediumText, LargeText } from "@components/AppText";
import { useAppSelector } from "@hooks/useAppStore";
import { COLORS } from "@constants/theme";

const AccountScreen = () => {
  const { theme } = useTheme();
  const { userInfo } = useAppSelector((state) => state.auth);

  const options = [
    {
      name: "Edit Profle",
      icon: (
        <Ionicons
          name="person-outline"
          size={20}
          color={theme.SECONDARY_TEXT_COLOR}
        />
      ),
    },
    {
      name: "Terms and Conditions",
      icon: (
        <Ionicons
          name="newspaper-outline"
          size={20}
          color={theme.SECONDARY_TEXT_COLOR}
        />
      ),
    },
    {
      name: "Privacy Policy",
      icon: (
        <Ionicons
          name="shield-checkmark-outline"
          size={20}
          color={theme.SECONDARY_TEXT_COLOR}
        />
      ),
    },
    {
      name: "Activities",
      icon: (
        <Ionicons name="list" size={20} color={theme.SECONDARY_TEXT_COLOR} />
      ),
    },
  ];

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <View style={styles.avatar}>
          <View style={{ position: "relative" }}>
            <MyAvatar size={200} iconSize={100} />
            <TouchableOpacity
              style={[{ backgroundColor: COLORS.gold }, styles.editAvatar]}
            >
              <Ionicons name="ios-camera" size={22} color={COLORS.dark} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <LargeText>
            {userInfo?.data?.first_name} {userInfo?.data?.last_name}
          </LargeText>
          <MediumText>{userInfo?.data?.email}</MediumText>
        </View>
        <View style={{ marginTop: 20 }}>
          {options.map((item, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 20,
                marginBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: theme.PRIMARY_BORDER_COLOR,
              }}
            >
              {item.icon}
              <MediumText
                style={{
                  color: theme.PRIMARY_TEXT_COLOR,
                  paddingHorizontal: 10,
                }}
              >
                {item.name}
              </MediumText>
            </View>
          ))}
        </View>
      </AppScrollView>
    </AppSafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    marginTop: 10,
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
