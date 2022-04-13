import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  Dimensions
} from 'react-native'
import { COLORS, SIZES } from '../../../constants/theme';

const { width, height } = Dimensions.get("window")

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: 'center', width }}>
      <Image 
        source={item.image} 
        style={{
          height,
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
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  )
}

export default Slide;

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    bottom: height * 0.20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    color: COLORS.dark,
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    marginTop: 25,
    textAlign: 'center'
  },
  subtitle: {
    color: COLORS.grey,
    paddingHorizontal: 25,
    fontSize: SIZES.md,
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 23
  },
})