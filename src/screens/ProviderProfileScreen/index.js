import {
  View,
  StyleSheet,
  Linking,
  TouchableOpacity
} from 'react-native'
import { AppScrollView, AppSafeAreaView } from '@components/AppViews'
import MyAvatar from '../../global/MyAvatar'
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import useTheme from '@hooks/useTheme';
import { MediumText, LargeText, XtraLargeText, SmallText } from '@components/AppText';
import AppButton from '@components/AppButton';
import WorkImages from './components/WorkImages';

export default ProviderProfileScreen = () => {
  const [theme] = useTheme()

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

        <View style={{ marginTop: 15 }}>
          <View 
            style={{ 
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 2 
            }}
          >
            <LargeText>Bio</LargeText>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:+2348141726099`)}
            >
              <Entypo name="old-phone" size={24} color={theme.gold} />
            </TouchableOpacity>
          </View>
          <MediumText>Hi there! I can perfom your cleaning services for you at a fast workrate.</MediumText>
        </View>

        <View 
          style={{ 
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name="location-outline" size={15} color={theme.PRIMARY_TEXT_COLOR} />
            <MediumText style={{ marginLeft: 3.5 }}>Ikeja, Lagos</MediumText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name="calendar-outline" size={15} color={theme.PRIMARY_TEXT_COLOR} />
            <MediumText style={{ marginLeft: 3.5 }}>Joined July 2022</MediumText>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MediumText style={{ color: theme.PRIMARY_TEXT_COLOR, fontFamily: 'FONT_SEMI_BOLD' }}>27</MediumText>
          <MediumText style={{ marginLeft: 3.5 }}>Completed Services</MediumText>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{ 
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 5 
            }}
          >
            <LargeText>Ratings and reviews</LargeText>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                alignSelf: 'flex-start',
                padding: 10,
                paddingVertical: 7.5,
                borderWidth: 1,
                borderColor: theme.PRIMARY_BORDER_COLOR
              }}
            >
              <SmallText style={{ color: theme.PRIMARY_TEXT_COLOR }}>See All (17)</SmallText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={{ paddingRight: 10 }}>
              <XtraLargeText>4.7</XtraLargeText>
              <View
                style={{
                  flexDirection: 'row'
                }}
              >
                <Ionicons name="star" size={12} color={theme.gold} />
                <Ionicons name="star" size={12} color={theme.gold} />
                <Ionicons name="star" size={12} color={theme.gold} />
                <Ionicons name="star" size={12} color={theme.gold} />
                <Ionicons name="star" size={12} color={theme.gold} />
              </View>
              <MediumText>25 ratings</MediumText>
            </View>

            <View
              style={{
                flex: 1,
                borderLeftWidth: 1,
                borderLeftColor: theme.PRIMARY_BORDER_COLOR,
                paddingLeft: 10
              }}
            >
              <MediumText style={{ color: theme.PRIMARY_TEXT_COLOR }}>Miracle Olisa</MediumText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5
                }}
              >
                <View
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  <Ionicons name="star" size={12} color={theme.gold} />
                  <Ionicons name="star" size={12} color={theme.gold} />
                  <Ionicons name="star" size={12} color={theme.gold} />
                  <Ionicons name="star" size={12} color={theme.gold} />
                  <Ionicons name="star" size={12} color={theme.gold} />
                </View>
                <SmallText style={{ marginLeft: 3.5 }}>05-07-2022</SmallText>
              </View>
              <MediumText>I don't understand what this guy is doing, but come to think of it in my own judgement...</MediumText>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <WorkImages />
        </View>

        

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