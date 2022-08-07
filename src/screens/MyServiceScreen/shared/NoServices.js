import { View, StyleSheet } from 'react-native';
import { MediumText } from "@components/AppText";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from '@hooks/useTheme';

export default NoServices = ({ title }) => {
  const [theme] = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MaterialCommunityIcons name="emoticon-sad-outline" size={100} color={theme.PRIMARY_TEXT_COLOR} />
      <MediumText style={styles.text(theme)}>You don't have any {title} Services</MediumText>
    </View>
  )
}

const styles = StyleSheet.create({
  text: (theme) => ({
    color: theme.PRIMARY_TEXT_COLOR,
    marginTop: 15
  })
})