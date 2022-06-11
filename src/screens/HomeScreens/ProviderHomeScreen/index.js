import React from 'react'
import { ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';
import { AppSafeAreaView, AppRareScrollView, AppSectionView } from '../../../components/AppViews'
import HomeHeader from "../components/HomeHeader";
import SwitchModeInfo from '../components/SwitchModeInfo';
import useSwitchUserMode from '../../../hooks/useSwitchUserMode';
import { LargeText, MediumText } from '../../../components/AppText';
import useTheme from '../../../hooks/useTheme';
import { FontAwesome } from '@expo/vector-icons';

export default ProviderHomeScreen = () => {
  const [theme] = useTheme()
  const [a, b, isModeSwitch] = useSwitchUserMode()
  
  return (
    <>
      {isModeSwitch ? 
        <SwitchModeInfo />
      :
        <AppSafeAreaView style={{ position: 'relative' }}>
          <HomeHeader />
          <ScrollView>
            <AppSectionView style={{ paddingHorizontal: 20 }}>
              <LargeText>Hi, John 👋</LargeText>
              <MediumText>Explore DecMark services</MediumText>
            </AppSectionView>
            <View 
              style={{ 
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: theme.PRIMARY_BORDER_COLOR,
              }}
            >
              <TouchableOpacity>
                <MediumText>Trending</MediumText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderBottomWidth: 3,
                  borderBottomColor: theme.gold,
                }}
              >
                <MediumText style={{ color: theme.PRIMARY_TEXT_COLOR, fontFamily: 'FONT_SEMI_BOLD' }}>Services</MediumText>
              </TouchableOpacity>
              <TouchableOpacity>
                <MediumText>Offers (5)</MediumText>
              </TouchableOpacity>
            </View>
          </ScrollView>
            <TouchableOpacity 
              style={[
                styles.floatBtn,
                {
                  backgroundColor: theme.gold,
                  borderColor: theme.gold
                }
              ]}
            >
              <FontAwesome name="plus" size={24} color={theme.dark} />
            </TouchableOpacity>
        </AppSafeAreaView>
      }
    </>
  )
}

const styles = StyleSheet.create({
  floatBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
  }
})