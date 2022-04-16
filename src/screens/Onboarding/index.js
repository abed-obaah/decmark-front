import React from 'react'
import { 
  useWindowDimensions, 
  SafeAreaView,
  FlatList,
  Animated
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Slide from './components/Slide';
import Footer from './components/Footer';
import * as NavigationBar from 'expo-navigation-bar';
import slides from '../../constants/slides';

export default Onboarding = () => {
  const { height, width } = useWindowDimensions();
  NavigationBar.setBackgroundColorAsync('white')
  NavigationBar.setButtonStyleAsync("dark");

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const scrollX = React.useRef(new Animated.Value(0)).current
  const slideRef = React.useRef(null)

  const handleUpdateIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    setCurrentIndex(Math.round(contentOffsetX / width))
  }

  const handleNextSlide = () => {
    const nextSlideIndex = currentIndex + 1
    if(nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width
      slideRef?.current?.scrollToOffset({offset})
      setCurrentIndex(nextSlideIndex)
    }
  }

  const handleSkipSlide = () => {
    const lastSlideIndex = slides.length - 1
    const offset = lastSlideIndex * width
    slideRef?.current?.scrollToOffset({offset})
    setCurrentIndex(lastSlideIndex)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <StatusBar style="light" />
      <FlatList 
        ref={slideRef}
        onMomentumScrollEnd={handleUpdateIndex}
        data={slides}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ height: height }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Slide item={item} />}
        onScroll={Animated.event([{
            nativeEvent: {
              contentOffset: { x: scrollX }
            }
          }],
          { useNativeDriver: false }
        )}
      />
      <Footer 
        slides={slides}
        scrollX={scrollX}
        currentIndex={currentIndex} 
        handleNextSlide={handleNextSlide}
        handleSkipSlide={handleSkipSlide}
      />
    </SafeAreaView>
  )
}