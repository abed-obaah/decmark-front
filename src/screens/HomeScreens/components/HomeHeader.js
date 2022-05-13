import React from 'react'
import { 
  StyleSheet,
  Platform, 
  View,
  Image,
  Pressable,
  TouchableOpacity,
  NativeModules
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../redux/slices/themeSlice';

const { StatusBarManager } = NativeModules;

export default HomeHeader = () => {
  const theme = useSelector(selectTheme)

  // const myAvatar = null
  const myAvatar = require("../../../assets/images/my_avatar.png")

  return (
    <View style={[styles.container, { borderBottomColor: theme.PRIMARY_BORDER_COLOR }]}>
      <View style={styles.subContainer}>
        <Pressable>
          {myAvatar ? 
            <Image 
              source={myAvatar} 
              style={{
                height: 35,
                width: 35,
                resizeMode: 'cover',
                borderRadius: 50
              }} 
            />
          :
            <View style={[styles.avatar, { backgroundColor: theme.PRIMARY_BORDER_COLOR }]}>
              <Ionicons name="person" size={22.5} color={theme.SECONDARY_TEXT_COLOR} />
            </View>
          }
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.buttons}>
            <Ionicons name="search-outline" size={20} color={theme.PRIMARY_TEXT_COLOR} />
          </TouchableOpacity>
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
    borderBottomWidth: 1,
    paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: 6
  },
  avatar: {
    paddingHorizontal: 6.5,
    paddingVertical: 5,
    borderRadius: 50
  },
  buttons: {
    paddingHorizontal: 10,
    paddingVertical: 2.5,
  }
})