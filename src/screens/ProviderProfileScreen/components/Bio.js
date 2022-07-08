import { 
  View, 
  Linking,
  TouchableOpacity 
} from 'react-native';
import useTheme from '@hooks/useTheme';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { MediumText, LargeText } from '@components/AppText';

export default Bio = () => {
  const [theme] = useTheme()

  return (
    <>
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
    </>
  )
}