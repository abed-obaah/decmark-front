import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  useWindowDimensions
} from 'react-native'
import { COLORS, SIZES } from '../../../constants/theme';

export default Slide = ({ item }) => {
  const { height, width } = useWindowDimensions();
  return (
    <View style={{ width, height: height * .80 }}>
      <Image 
        source={item.image} 
        style={{
          height: '100%',
          width,
          resizeMode: 'cover'
        }} 
      />
      <View 
        style={[
          StyleSheet.absoluteFillObject, 
          { backgroundColor: 'rgba(0,0,0,.65)' }
        ]}
      />
      <View style={[styles.content, { width }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    color: COLORS.dark,
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    marginTop: 25,
    textAlign: 'center',
    paddingHorizontal: 25,
  },
  description: {
    color: COLORS.grey,
    fontSize: SIZES.md,
    textAlign: 'center',
    paddingHorizontal: 25,
    marginTop: 10,
    lineHeight: 23
  },
})