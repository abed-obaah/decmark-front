import React, { FC, useEffect, useState } from "react";
import { View, Image, Text } from "react-native"; // Import Text component
import { Ionicons } from "@expo/vector-icons";
import useAppTheme from "@src/hooks/useAppTheme";
import AppLoader from "@src/components/ui/AppLoader";

interface MyAvatarProps {
  size?: number;
  iconSize?: number;
  image?: string | null;
}

const MyAvatar: FC<MyAvatarProps> = ({ size = 35, iconSize = 20, image }) => {
  const { theme } = useAppTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [imageKey, setImageKey] = useState(0);

  useEffect(() => {
    if (image) {
      setIsLoading(true);
      // Update the key to force Image component to refresh
      setImageKey(imageKey + 1);
    }
  }, [image]);

  return (
    <View style={{ height: size, width: size }}>
      {image ? (
        <Image
          key={imageKey}
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
          <Text> {/* Use Text component to render text (icon) */}
            <Ionicons
              name="person"
              size={iconSize}
              color={theme.PRIMARY_TEXT_COLOR}
            />
          </Text>
        </View>
      )}
     
    </View>
  );
};

export default MyAvatar;
