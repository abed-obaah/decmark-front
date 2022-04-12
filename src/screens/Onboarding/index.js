import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { 
  Dimensions, 
  SafeAreaView,
  FlatList,
} from 'react-native';
import Slide from './components/Slide';
import Footer from './components/Footer';

const { width, height } = Dimensions.get("window")

const slides = [
  {
    id: 1,
    image: require("../../assets/images/cleaning.jpg"),
    title: "Welcome 1",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 2,
    image: require("../../assets/images/repair.jpg"),
    title: "Welcome 2",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 3,
    image: require("../../assets/images/cleaner.jpg"),
    title: "Welcome 3",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
]

const Onboarding = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0)
  const ref = React.useRef(null)

  const handleUpdateSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
  }

  const handleNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    if(nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width
      ref?.current?.scrollToOffset({offset})
      setCurrentSlideIndex(nextSlideIndex)
    }
  }

  const handleSkipSlide = () => {
    const lastSlideIndex = slides.length - 1
    const offset = lastSlideIndex * width
    ref?.current?.scrollToOffset({offset})
    setCurrentSlideIndex(lastSlideIndex)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <StatusBar style="light" />
      <FlatList 
        ref={ref}
        onMomentumScrollEnd={handleUpdateSlideIndex}
        pagingEnabled
        data={slides}
        contentContainerStyle={{ height: height }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer 
        slides={slides}
        currentSlideIndex={currentSlideIndex} 
        handleNextSlide={handleNextSlide}
        handleSkipSlide={handleSkipSlide}
      />
    </SafeAreaView>
  )
}

export default Onboarding;