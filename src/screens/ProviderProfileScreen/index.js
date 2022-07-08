import {
  View,
  StyleSheet
} from 'react-native'
import { AppScrollView, AppSafeAreaView } from '@components/AppViews'
import MyAvatar from '../../global/MyAvatar'
import { MaterialIcons } from '@expo/vector-icons';
import { MediumText, XtraLargeText } from '@components/AppText';
import AppButton from '@components/AppButton';
import WorkImages from './components/WorkImages';
import RatingsReviews from './components/RatingsReviews';
import Bio from './components/Bio';

export default ProviderProfileScreen = () => {
  return (
    <AppSafeAreaView>
      <AppScrollView>
        <View style={styles.avatar}>
          <View style={{ position: 'relative' }}>
            <MyAvatar size={150} />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <XtraLargeText>John Adibe <MaterialIcons name="verified" size={24} color={"green"} /></XtraLargeText>
          <MediumText>General Services &bull; Plumber</MediumText>
        </View>
        <Bio />
        <RatingsReviews />
        <WorkImages />
      </AppScrollView>
      <View 
        style={{ 
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginBottom: 5
        }}
      >
        <AppButton label="Chat" marginTop={10} buttonHeight={45} />
      </View>
    </AppSafeAreaView>
  )
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    marginTop: 15,
  },
})