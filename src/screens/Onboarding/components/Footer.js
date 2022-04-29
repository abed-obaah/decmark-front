import React from 'react'
import { View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SIZES } from '../../../constants/theme';
import Paginator from './Paginator';
import styled from 'styled-components/native';
import AppButton from '../../../components/AppButton';

export default Footer = ({ currentIndex, handleNextSlide, handleSkipSlide, slides, scrollX }) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  
  return (
    <SlideFooter
      style={{
        height: height * 0.20,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}
    >
      <Paginator 
        slides={slides} 
        scrollX={scrollX}
      />

      <View style={{ marginBottom: 20, flexDirection: 'row' }}>
        {currentIndex === slides.length - 1 ?
          <AppButton 
            label="GET STARTED" 
            radius={SIZES.rounded}
            onPress={() => navigation.replace("WelcomeScreen")} 
          />
        :
          <>
            <AppButton 
              label="SKIP" 
              background='transparent'
              radius={SIZES.rounded}
              onPress={handleSkipSlide}
            />
            <View style={{width: 15}} />
            <AppButton 
              label="NEXT" 
              radius={SIZES.rounded}
              onPress={handleNextSlide}
            />
          </>
        }
      </View>
    </SlideFooter>
  )
}

const SlideFooter = styled.View`
  background-color: ${({theme}) => theme.PRIMARY_BACKGROUND_COLOR};
`