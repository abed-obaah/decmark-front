import { View, StyleSheet } from "react-native";
import { MediumText } from "@src/components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTheme from "@src/hooks/useAppTheme";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "i18next";


export default NoServices = ({ title }) => {
  const { theme } = useTheme();
  const { t} = useTranslation();
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MaterialCommunityIcons
        name="emoticon-sad-outline"
        size={100}
        color={theme.PRIMARY_TEXT_COLOR}
      />
      <MediumText style={styles.text(theme)}>
      {t('emptyServices')} {title} {t('services')} 
      </MediumText>
    </View>
  );
};

const styles = StyleSheet.create({
  text: (theme) => ({
    color: theme.PRIMARY_TEXT_COLOR,
    marginTop: 15,
  }),
});
