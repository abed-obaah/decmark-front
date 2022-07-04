import { 
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { AppScrollView, AppSafeAreaView } from '@components/AppViews'
import MyAvatar from '../../global/MyAvatar'
import { Ionicons } from '@expo/vector-icons';
import useTheme from '@hooks/useTheme';
import { MediumText, LargeText } from '@components/AppText';

export default AccountScreen = () => {
  const [theme] = useTheme()

  const options = [
    {
      name: "Edit Profle",
      icon: <Ionicons name="person-outline" size={20} color={theme.SECONDARY_TEXT_COLOR} />
    },
    {
      name: "Terms and Conditions",
      icon: <Ionicons name="newspaper-outline" size={20} color={theme.SECONDARY_TEXT_COLOR} />
    },
    {
      name: "Privacy Policy",
      icon: <Ionicons name="shield-checkmark-outline" size={20} color={theme.SECONDARY_TEXT_COLOR} />
    }
  ]

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <View style={styles.avatar}>
          <View style={{ position: 'relative' }}>
            <MyAvatar size={200} />
            <TouchableOpacity style={[{ backgroundColor: theme.gold }, styles.editAvatar]}>
              <Ionicons name="ios-camera" size={22} color={theme.dark} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 15
          }}
        >
          <LargeText>John Adibe</LargeText>
          <MediumText>john.adibe@decmark.com</MediumText>
        </View>
        <View style={{ marginTop: 20 }}>
          {options.map((item, i) => 
            <View 
              key={i}
              style={{ 
                flexDirection: 'row',
                alignItems: "center",
                paddingBottom: 20,
                marginBottom: 20,
                borderBottomWidth: 1, 
                borderBottomColor: theme.PRIMARY_BORDER_COLOR 
              }}
            >
              {item.icon}
              <MediumText style={{ color: theme.PRIMARY_TEXT_COLOR, paddingHorizontal: 10 }}>{item.name}</MediumText>
            </View>
          )}
        </View>
      </AppScrollView>
    </AppSafeAreaView>
  )
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    marginTop: 10,
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  }
})