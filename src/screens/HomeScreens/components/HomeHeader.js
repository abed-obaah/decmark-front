import React from 'react'
import { 
  StyleSheet,
  Platform, 
  View,
  TouchableOpacity,
  NativeModules,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MyAvatar from '../../../global/MyAvatar';
import { useNavigation } from '@react-navigation/native';
import useTheme from '../../../hooks/useTheme';
import { LargeText } from '../../../components/AppText';

const { StatusBarManager } = NativeModules;

export default HomeHeader = () => {
  const [theme] = useTheme()
  const navigation = useNavigation()

  return (
    <View style={[styles.container, { borderBottomColor: theme.PRIMARY_BORDER_COLOR }]}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileStack', { screen: 'MenuScreen' })}>
          <MyAvatar />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Image 
            source={require("../../../assets/images/logo.png")} 
            style={{
              width: 30,
              height: 30
            }}
          />
          <LargeText>DecMark</LargeText>
        </View>
        <View style={{ flexDirection: "row" }}>
          {/* <TouchableOpacity style={styles.buttons}>
            <Ionicons name="search-outline" size={20} color={theme.PRIMARY_TEXT_COLOR} />
          </TouchableOpacity> */}
          <View style={{ width: 10 }}/>
          <TouchableOpacity style={styles.buttons}>
            <Ionicons name="notifications" size={20} color={theme.PRIMARY_TEXT_COLOR} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderBottomWidth: .5,
    paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: 6
  },
  buttons: {
    paddingHorizontal: 10,
    paddingVertical: 2.5,
  }
})