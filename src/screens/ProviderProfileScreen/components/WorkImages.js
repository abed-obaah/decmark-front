import { 
  StyleSheet, 
  View, 
  Image, 
  useWindowDimensions 
} from 'react-native';
import { LargeText } from '@components/AppText';

export default WorkImages = () => {
  const { width } = useWindowDimensions()

  return (
    <>
      <LargeText style={{ marginBottom: 5 }}>Images</LargeText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View>
          <Image 
            source={require("@assets/images/repair.jpg")}
            style={{
              height: 200,
              width: (width - 50) / 2,
              resizeMode: 'cover',
              borderRadius: 5
            }} 
          />
        </View>
        <View 
          style={{ 
            width: (width - 50) / 2,
            justifyContent: 'space-between'
          }}
        >
          <Image 
            source={require("@assets/images/repair.jpg")}
            style={{
              height: 95,
              width: '100%',
              resizeMode: 'cover',
              borderRadius: 5
            }} 
          />
          <Image 
            source={require("@assets/images/repair.jpg")}
            style={{
              height: 95,
              width: '100%',
              resizeMode: 'cover',
              borderRadius: 5
            }} 
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({})