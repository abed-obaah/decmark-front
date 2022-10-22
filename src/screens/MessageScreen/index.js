import React from "react";
import { View } from "react-native";
import { AppSafeAreaView } from "@components/AppViews";
import { MediumText, SmallText } from "@components/AppText";
import useTheme from "@hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";

export default MessageScreen = () => {
  const { theme } = useTheme();

  return (
    <AppSafeAreaView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Ionicons
          name="ios-chatbox-ellipses"
          color={theme.SECONDARY_TEXT_COLOR}
          size={100}
        />
        <MediumText>No Messages yet</MediumText>
        <SmallText
          style={{
            position: "absolute",
            bottom: 50,
            color: theme.PRIMARY_TEXT_COLOR,
          }}
        >
          NOTE: Chats will disappear{" "}
          <SmallText style={{ color: theme.GOLDEN_TEXT }}>7 days</SmallText>{" "}
          after closing a service
        </SmallText>
      </View>
    </AppSafeAreaView>
  );
};
