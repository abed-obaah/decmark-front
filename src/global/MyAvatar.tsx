import React, { FC } from "react";
import { View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAppTheme from "@src/hooks/useAppTheme";
import { useAppSelector } from "@src/hooks/useAppStore";
import AppLoader from "@src/components/ui/AppLoader";

interface MyAvatarProps {
  size?: number;
  iconSize?: number;
  image?: string | null;
}

const MyAvatar: FC<MyAvatarProps> = ({ size = 35, iconSize = 20, image }) => {
  const { theme } = useAppTheme();
  const { isLoadingImg } = useAppSelector((state) => state.account);

  return (
    <View style={{ height: size, width: size }}>
      {isLoadingImg ? <AppLoader rounded /> : null}
      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "cover",
            borderRadius: 200,
          }}
        />
      ) : (
        <View
          style={{
            backgroundColor: theme.PRIMARY_BORDER_COLOR,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 150,
          }}
        >
          <Ionicons
            name="person"
            size={iconSize}
            color={theme.PRIMARY_TEXT_COLOR}
          />
        </View>
      )}
    </View>
  );
};

export default MyAvatar;
