import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  useWindowDimensions,
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../../constants/theme';
import Paginator from './Paginator';

export default Footer = ({ currentIndex, handleNextSlide, handleSkipSlide, slides, scrollX }) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  
  return (
    <View
      style={{
        height: height * 0.20,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
      }}
    >
      <Paginator 
        slides={slides} 
        scrollX={scrollX}
      />

      <View style={{ marginBottom: 20 }}>
        {currentIndex === slides.length - 1 ?
          <View style={{height: 45}}>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.replace("LogIn")}>
              <Text style={{fontWeight: 'bold', fontSize: SIZES.md, color: COLORS.dark}}>GET STARTED</Text>
            </TouchableOpacity>
          </View>
        :
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity 
              onPress={handleSkipSlide}
              style={[styles.btn, { 
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: COLORS.light
              }]}
            >
              <Text style={{fontWeight: 'bold', fontSize: SIZES.md, color: COLORS.dark }}>SKIP</Text>
            </TouchableOpacity>
            <View style={{width: 15}} />
            <TouchableOpacity style={styles.btn} onPress={handleNextSlide}>
              <Text style={{fontWeight: 'bold', fontSize: SIZES.md, color: COLORS.dark }}>NEXT</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    height: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})