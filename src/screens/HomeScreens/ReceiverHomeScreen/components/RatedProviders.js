import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  useWindowDimensions
} from 'react-native'
import { LargeText, SmallText, MediumText } from "../../../../components/AppText"
import AppButton from '../../../../components/AppButton';
import { SIZES } from '../../../../constants/theme';
import useTheme from '../../../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

export default RatedProviders = () => {
  const { width } = useWindowDimensions()
  const [theme] = useTheme()

  const providers = [
    {
      name: "John Adibe",
      category: "Cleaner",
      price: '40,500',
      description: "Hi there! I can perfom your cleaning services for you at a fast workrate.",
      location: "Ogba, Lagos"
    },
    {
      name: "Chidera",
      category: "Repairs",
      price: '40,500',
      description: "Hi there! I can perfom your cleaning services for you at a fast workrate.",
      location: "Ikeja, Lagos"
    },
    {
      name: "Paul",
      category: "Repairs",
      price: '70,500',
      description: "Hi there! I can perfom your cleaning services for you at a fast workrate.",
      location: "Ikeja, Lagos"
    },
    {
      name: "Miracle",
      category: "Repairs",
      price: '70,500',
      description: "Hi there! I can perfom your cleaning services for you at a fast workrate.",
      location: "Ikeja, Lagos"
    },
    {
      name: "Christian",
      category: "Repairs",
      price: '70,500',
      description: "Hi there! I can perfom your cleaning services for you at a fast workrate.",
      location: "Ikeja, Lagos"
    },
    {
      name: "Dominic",
      category: "Repairs",
      price: '70,500',
      description: "Hi there! I can perfom your cleaning services for you at a fast workrate.",
      location: "Ikeja, Lagos"
    },
  ]
  
  const ProviderSlide = ({ item }) => {
    return (
      <View 
        style={{ 
          backgroundColor: 'transparent',
          width: width - 90,
          marginRight: 15,
          padding: 10,
          borderWidth: 1,
          borderRadius: SIZES.radius,
          borderColor: theme.PRIMARY_BORDER_COLOR
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10
          }}
        >
          <View 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View 
              style={{ 
                backgroundColor: theme.PRIMARY_BORDER_COLOR, 
                height: 35,
                width: 35, 
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50
              }}
            >
              <Ionicons name="person" size={20} color={theme.PRIMARY_TEXT_COLOR} />
            </View>
            <View style={{ marginLeft: 5 }}>
              <MediumText 
                numberOfLines={1} 
                style={{ 
                  color: theme.PRIMARY_TEXT_COLOR, 
                  fontWeight: 'bold',
                }}
              >{item.name}</MediumText>
              <MediumText>{item.category}</MediumText>
            </View>
          </View>
          <View>
            <MediumText style={{ color: theme.PRIMARY_TEXT_COLOR, fontWeight: 'bold', }}>₦{item.price}</MediumText>
          </View>
        </View>
        <SmallText>{item.description}</SmallText>
        <View 
          style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            marginTop: 25
          }}
        >
          <View 
            style={{
              flexDirection: 'row', 
              alignItems: 'center', 
              width: '50%',
            }}
          >
            <Ionicons name="location-outline" size={20} color={theme.gold} />
            <SmallText style={{ color: theme.PRIMARY_TEXT_COLOR, marginLeft: 2.5 }}>{item.location}</SmallText>
          </View>
          <AppButton 
            label="Hire" 
            marginTop={.5} 
            buttonHeight={40}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={{ marginBottom: 22.5 }}>
      <LargeText style={{ paddingHorizontal: 20 }}>Rated providers</LargeText>
      <FlatList 
        data={providers}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginVertical: 10, paddingHorizontal: 20 }}
        keyExtractor={(_, i) => i}
        renderItem={({ item, i }) => 
          <ProviderSlide item={item} />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({})