import { View } from 'react-native';
import useTheme from '@hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { MediumText, LargeText } from '@components/AppText';

export default Bio = () => {
  const [theme] = useTheme()

  return (
    <>
      <View style={{ marginTop: 15 }}>
        <LargeText style={{marginBottom: 2}}>Bio</LargeText>
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