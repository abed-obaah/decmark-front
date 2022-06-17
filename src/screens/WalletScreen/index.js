import { useState } from 'react'
import { 
  View,
  NativeModules,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet
} from 'react-native'
import { AppRareScrollView, AppSafeAreaView, AppSectionView } from '../../components/AppViews'
import useTheme from '../../hooks/useTheme';
import { LargeText, MediumText, SmallText } from "../../components/AppText"
import { Ionicons } from '@expo/vector-icons';

const { StatusBarManager } = NativeModules;

export default WalletScreen = () => {
  const [theme] = useTheme()
  const [amountVisible, setAmountVisible] = useState(true)

  const { width } = useWindowDimensions()

  const options = [
    {
      icon: 'card-outline',
      text: 'Deposit'
    },
    {
      icon: 'paper-plane',
      text: 'Withdraw'
    },
    {
      icon: 'move',
      text: 'Transfer'
    },
    // {
    //   icon: 'cash-outline',
    //   text: 'Tip'
    // },
  ]

  return (
    <AppSafeAreaView>
      <View style={[styles.headerContainer, { borderBottomColor: theme.PRIMARY_BORDER_COLOR }]}>
        <LargeText>Wallet</LargeText>
      </View>
      <AppRareScrollView>
        <AppSectionView style={{ paddingHorizontal: 20 }}>
          <View
            style={[
              styles.overview, { 
                backgroundColor: theme.INPUT_BACKGROUND_COLOR, 
                borderColor: theme.PRIMARY_BORDER_COLOR 
              }
            ]}
          >
            <View>
              <LargeText>₦ {amountVisible ? "100,000.00" : "XXXXXX.XX"}</LargeText>
              <SmallText style={{ color: theme.PRIMARY_TEXT_COLOR, marginTop: 10 }}>
                Book Balance: 
                <SmallText style={{ color: theme.GOLDEN_TEXT }}> ₦ {amountVisible ? "125,050.00" : "XXXXXX.XX"}</SmallText>
              </SmallText>
            </View>
            <View>
            <TouchableOpacity 
              onPress={() => setAmountVisible(!amountVisible)}
              style={{ paddingRight: 5 }}
            >
              <Ionicons 
                name={amountVisible ? "eye-off" : "eye"} 
                size={24} 
                color={theme.PRIMARY_TEXT_COLOR} 
              />
            </TouchableOpacity>
            </View>
          </View>

          <View 
            style={{
              flexDirection: 'row',
              paddingTop: 20
            }}
          >
            {options.map((item, i) => 
              <TouchableOpacity 
                key={i}
                style={{
                  width: (width - 40) / options.length,
                  alignItems: 'center',
                  borderRightWidth: 1,
                  borderRightColor: i + 1 === options.length ? 'transparent' : theme.PRIMARY_BORDER_COLOR 
                }}
              >
                <Ionicons name={item.icon} size={15} color={theme.PRIMARY_TEXT_COLOR} />
                <SmallText style={{ color: theme.PRIMARY_TEXT_COLOR }}>{item.text}</SmallText>
              </TouchableOpacity>
            )}
          </View>
        </AppSectionView>
        <AppSectionView>
          <LargeText 
            style={{ 
              paddingBottom: 10, 
              paddingHorizontal: 20,
              borderBottomWidth: 1, 
              borderBottomColor: theme.PRIMARY_BORDER_COLOR 
            }}
          >Transactions</LargeText>
          <View 
            style={{
              height: 250,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MediumText>Oops!</MediumText>
            <MediumText>No transactions history</MediumText>
          </View>
        </AppSectionView>
      </AppRareScrollView>
    </AppSafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    borderBottomWidth: .5,
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  },
  overview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5
  }
})