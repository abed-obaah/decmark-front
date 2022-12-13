import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "@src/constants/theme";
import { Feather } from "@expo/vector-icons";
import useAppTheme from "@src/hooks/useAppTheme";
import { ErrorText, MediumText } from "@src/components/AppText";
import * as ImagePicker from "expo-image-picker";

export default UploadView = ({ label, error, setImage, image }) => {
  const { theme } = useAppTheme();
  const [backgroundColor, setBackgroundColor] = React.useState(
    theme.INPUT_BACKGROUND_COLOR
  );
  const [borderColor, setBorderColor] = React.useState(
    theme.PRIMARY_BORDER_COLOR
  );
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri, name: result.assets[0].fileName });
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      {label && (
        <MediumText
          style={{ marginBottom: 3, color: theme.PRIMARY_TEXT_COLOR }}
        >
          {label}
        </MediumText>
      )}
      <TouchableOpacity
        onPress={pickImage}
        style={[
          styles.inputContainer,
          { backgroundColor },
          error ? { borderColor: COLORS.red } : { borderColor },
        ]}
      >
        <MediumText>{image.name}</MediumText>
        <Feather
          name="upload"
          style={{
            color: COLORS.dark,
            fontSize: 16,
            paddingRight: 2.5,
          }}
        />
      </TouchableOpacity>
      {error && (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
        >
          <Feather
            name="alert-circle"
            style={{
              color: COLORS.red,
              fontSize: 16,
              paddingRight: 2.5,
            }}
          />
          <ErrorText>{error}</ErrorText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
