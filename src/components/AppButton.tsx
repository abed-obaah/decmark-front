import { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "@src/constants/theme";
import useAppTheme from "@src/hooks/useAppTheme";

interface AppButtonProps {
  label?: string;
  background?: string;
  marginTop?: number;
  radius?: number;
  buttonHeight?: number;
  onPress?: () => void;
  disabled?: boolean;
}

const AppButton: FC<AppButtonProps> = ({
  label,
  marginTop,
  background,
  radius,
  buttonHeight,
  onPress,
  disabled,
  ...props
}) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        height: buttonHeight ? buttonHeight : 50,
        backgroundColor: disabled
          ? COLORS.lightGold
          : background
          ? background
          : COLORS.gold,
        borderRadius: radius ? radius : SIZES.radius,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: disabled ? COLORS.lightGold : COLORS.gold,
        marginTop: marginTop ? marginTop : 25,
      }}
      {...props}
    >
      <Text
        style={{
          color: disabled
            ? COLORS.lightGrey
            : background
            ? theme.PRIMARY_TEXT_COLOR
            : COLORS.dark,
          fontSize: SIZES.md,
          fontFamily: "FONT_SEMI_BOLD",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;
