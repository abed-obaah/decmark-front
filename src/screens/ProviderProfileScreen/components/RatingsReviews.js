import { 
  View, 
  TouchableOpacity 
} from 'react-native';
import useTheme from '@hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { MediumText, LargeText, XtraLargeText, SmallText } from '@components/AppText';

export default RatingsReviews = () => {
  const [theme] = useTheme()

  return (
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
  )
}