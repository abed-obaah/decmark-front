import React from 'react'
import { 
  StyleSheet,
  View,
  Image,
  useWindowDimensions
} from 'react-native'
import { LargeText, MediumText } from '../../../components/AppText';
import styled from 'styled-components/native';

export default Slide = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width, flex: .8 }}>
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
          { backgroundColor: 'rgba(0,0,0,.25)' }
        ]}
      />
      <SlideContent style={{ width, paddingHorizontal: 15 }}>
        <LargeText 
          style={{ 
            marginTop: 25,
            textAlign: 'center',
          }}
        >
          {item.title}
        </LargeText>
        <MediumText
          style={{    
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          {item.description}
        </MediumText>
      </SlideContent>
    </View>
  )
}

const SlideContent = styled.View`
  position: absolute;
  bottom: 0;
  background-color: ${({theme}) => theme.PRIMARY_BACKGROUND_COLOR};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`