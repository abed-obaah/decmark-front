import React from 'react'
import { 
  StyleSheet, 
  Image, 
  View, 
  FlatList,
  useWindowDimensions
} from 'react-native'
import { LargeText, SmallText, MediumText } from "../../../../components/AppText"
import AppButton from '../../../../components/AppButton';
import { SIZES } from '../../../../constants/theme';
import useTheme from '../../../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { AppSectionView } from '../../../../components/AppViews';
import providers from '../constants/providers';

export default RatedProviders = () => {
  const { width } = useWindowDimensions()
  const [theme] = useTheme()
  
  const ProviderSlide = ({ item }) => {
    return (
      <View 
        style={{ 
          backgroundColor: 'transparent',
          width: width - 120,
          marginRight: 15,
          borderWidth: 1,
          borderRadius: SIZES.radius,
          borderColor: theme.PRIMARY_BORDER_COLOR
        }}
      >
        <Image 
          source={require("../../../../assets/images/my_avatar.png")} 
          style={{
            width: '100%',
            height: 100,
            borderTopLeftRadius: SIZES.radius,
            borderTopRightRadius: SIZES.radius,
            resizeMode: 'cover'
          }}
        />
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10
            }}
          >
            <View>
              <MediumText 
                numberOfLines={1} 
                style={{ 
                  color: theme.PRIMARY_TEXT_COLOR, 
                  fontFamily: 'FONT_SEMI_BOLD',
                }}
              >{item.name}</MediumText>
              <MediumText>{item.category}</MediumText>
            </View>
            <View>
              <MediumText style={{ color: theme.PRIMARY_TEXT_COLOR, fontFamily: 'FONT_SEMI_BOLD', }}>₦{item.price}</MediumText>
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
                width: '60%',
              }}
            >
              <Ionicons name="location-outline" size={20} color={theme.gold} />
              <SmallText 
                numberOfLines={1}
                style={{ 
                  color: theme.PRIMARY_TEXT_COLOR, 
                  marginLeft: 1 
                }}
              >{item.location}</SmallText>
            </View>
            <AppButton 
              label="Hire" 
              marginTop={.5} 
              buttonHeight={40}
            />
          </View>
        </View>
      </View>
    )
  }

  return (
    <AppSectionView>
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
    </AppSectionView>
  )
}

const styles = StyleSheet.create({})