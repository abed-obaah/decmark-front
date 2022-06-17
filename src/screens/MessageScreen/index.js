import React from 'react'
import { 
  View,
  Platform,
  NativeModules,
  StyleSheet
} from 'react-native'
import { AppSafeAreaView } from '../../components/AppViews'
import { LargeText, MediumText, SmallText } from "../../components/AppText"
import useTheme from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

const { StatusBarManager } = NativeModules;

export default MessageScreen = () => {
  const [theme] = useTheme()

  return (
    <AppSafeAreaView>
      <View style={[styles.headerContainer, { borderBottomColor: theme.PRIMARY_BORDER_COLOR }]}>
        <LargeText>Messages</LargeText>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons 
          name="ios-chatbox-ellipses" 
          color={theme.SECONDARY_TEXT_COLOR}
          size={100} 
        />
        <MediumText>No Messages yet</MediumText>
        <SmallText 
          style={{ 
            position: 'absolute',
            bottom: 50,
            color: theme.PRIMARY_TEXT_COLOR
          }}
        >
          NOTE: Chats will disappear <SmallText style={{ color: theme.GOLDEN_TEXT }}>7 days</SmallText> after closing a service
        </SmallText>
      </View>
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
})