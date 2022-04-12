import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions,
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../constants/theme';

const { height } = Dimensions.get("window")

const Footer = (props) => {
  const navigation = useNavigation();
  const { 
    currentSlideIndex, 
    handleNextSlide, 
    handleSkipSlide, 
    slides 
  } = props
  
  return (
    <View
      style={{
        height: height * 0.20,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
      }}
    >
      <View 
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20
        }}
      >
        {slides.map((_, i) =>
          <View 
            key={i}
            style={[
              styles.indicator,
              currentSlideIndex === i && {
                backgroundColor: COLORS.primary,
                width: 25,
                height: 3.5,
                borderColor: COLORS.primary
              }
            ]} 
          />
        )}
      </View>
      <View style={{ marginBottom: 20 }}>
        {currentSlideIndex === slides.length - 1 ?
          <View style={{height: 45}}>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.replace("SignUp")}>
              <Text style={{fontWeight: 'bold', fontSize: 15, color: COLORS.dark}}>GET STARTED</Text>
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
              <Text style={{fontWeight: 'bold', fontSize: 15, color: COLORS.dark }}>SKIP</Text>
            </TouchableOpacity>
            <View style={{width: 15}} />
            <TouchableOpacity style={styles.btn} onPress={handleNextSlide}>
              <Text style={{fontWeight: 'bold', fontSize: 15, color: COLORS.dark }}>NEXT</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  )
}

export default Footer;

const styles = StyleSheet.create({
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: COLORS.light,
    borderWidth: 1,
    borderColor: COLORS.light,
    marginHorizontal: 3,
    borderRadius: 2
  },
  btn: {
    flex: 1,
    height: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})