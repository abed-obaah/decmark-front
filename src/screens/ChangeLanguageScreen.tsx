import React, { useState } from 'react'
import { 
  View,
  Text, 
  TouchableOpacity, 
  TouchableNativeFeedback, 
  TouchableNativeFeedbackComponent,
  StyleSheet 
} from "react-native";
import { LargeText } from "@src/components/AppText";
import { AppSafeAreaView, AppScrollView } from "@src/components/AppViews";
import AppInput from "@src/components/AppInput";
import AppButton from "@src/components/AppButton";
import AppTextarea from "@src/components/AppTextarea";
import { useTranslation } from 'react-i18next'


const languages = [
  { name: 'english', code: 'en'},
  { name: 'igbo', code: 'ig'},
  { name: 'yoruba', code: 'yo'},
  { name: 'hausa', code: 'hu'},
  { name: 'pidgin', code: 'pg'},
  { name: 'hindi', code: 'hi'},
  { name: 'french', code: 'fr'},
  { name: 'mandarin', code: 'zh'},
]

const ChangeLanguageScreen = () => {
  const [showLanguagesList, setOpenLanguagesList] = useState(false)

  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <AppSafeAreaView>
      <AppScrollView>
        {/* <View style={styles.container}>
          <LargeText style={styles.largeText}>English</LargeText>
          <View style={styles.space}></View>
          <TouchableOpacity style={styles.button}>
            <LargeText style={styles.buttonText}>Default</LargeText>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <LargeText style={styles.largeText}>Yoruba</LargeText>
          <View style={styles.space}></View>
          <View style={styles.space}></View>
        </View>
        <View style={styles.container}>
          <LargeText style={styles.largeText}>Igbo</LargeText>
          <View style={styles.space}></View>
          <View style={styles.space}></View>
        </View>
        <View style={styles.container}>
          <LargeText style={styles.largeText}>Hausa</LargeText>
          <View style={styles.space}></View>
          <View style={styles.space}></View>
        </View>
        <View style={styles.container}>
          <LargeText style={styles.largeText}>French</LargeText>
          <View style={styles.space}></View>
          <View style={styles.space}></View>
        </View>
        <View style={styles.container}>
          <LargeText style={styles.largeText}>Pidgin</LargeText>
          <View style={styles.space}></View>
          <View style={styles.space}></View>
        </View> */}

<TouchableNativeFeedback onPress={() => {
        setOpenLanguagesList(!showLanguagesList)
        // LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'))
      }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{t('changeLanguage')}</Text>
        </View>
      </TouchableNativeFeedback>
      {showLanguagesList && <>
        {languages.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.button, { paddingHorizontal: 24 }]}
            onPress={() => changeLanguage(item.code)}>
            <Text style={styles.buttonText}>{t(item.name)}</Text>
          </TouchableOpacity>
        ))}
      </>
      }
      </AppScrollView>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },

  largeText: {
    marginRight: 10,
    flex: 1, // Added flex property
  },

  space: {
    width: 80,
  },

  button: {
    backgroundColor: "#DEB253",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },

  buttonText: {
    color: "black",
  },
});

export default ChangeLanguageScreen;
