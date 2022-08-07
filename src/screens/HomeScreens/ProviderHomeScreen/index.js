import { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppSafeAreaView, AppSectionView } from '@components/AppViews'
import SwitchModeInfo from '../components/SwitchModeInfo';
import useSwitchUserMode from '@hooks/useSwitchUserMode';
import { LargeText, MediumText } from '@components/AppText';
import useTheme from '@hooks/useTheme';
import { FontAwesome } from '@expo/vector-icons';
import GroupTab from '@components/GroupTab';
import MyServices from './components/MyServices';
import Offers from './components/Offers';

export default ProviderHomeScreen = ({ navigation }) => {
  const [theme] = useTheme()
  const [x, y, isModeSwitch] = useSwitchUserMode()

  const [activeTab, setActiveTab] = useState(1)
  const tabs = {
    0: <Offers />,
    1: <MyServices />,
    2: <Offers />
  }
  
  return (
    <>
      {isModeSwitch ? 
        <SwitchModeInfo />
      :
        <AppSafeAreaView style={{ position: 'relative' }}>
          <View style={{ flex: 1 }}>
            <AppSectionView style={{ paddingHorizontal: 20 }}>
              <LargeText>Hi, John 👋</LargeText>
              <MediumText>Explore DecMark services</MediumText>
            </AppSectionView>
            <GroupTab 
              tabs={["Trending", "Services", `Offers(${5})`]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {tabs[activeTab]}
          </View>
          {activeTab === 1 &&
            <TouchableOpacity 
              onPress={() => navigation.navigate("ServiceStack", { screen: "AddServiceScreen" })}
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
          }
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