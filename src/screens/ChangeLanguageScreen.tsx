import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppSafeAreaView, AppScrollView } from '@src/components/AppViews';
import { LargeText } from '@src/components/AppText';

const languages = [
  { name: 'english', code: 'en' },
  { name: 'igbo', code: 'ig' },
  { name: 'yoruba', code: 'yo' },
  { name: 'hausa', code: 'hu' },
  { name: 'pidgin', code: 'pg' },
  { name: 'french', code: 'fr' },
  
];

const ChangeLanguageScreen = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <AppSafeAreaView>
      <AppScrollView>
      <View style={styles.button}>
          <Text style={styles.buttonText}>{t('changeLanguage')}</Text>
        </View>
        {languages.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => changeLanguage(item.code)}>
            <View style={styles.container}>
              <LargeText style={[styles.largeText, i18n.language === item.code && styles.activeLanguage]}>
                {t(item.name)}
              </LargeText>
              {/* Optionally add an indicator for the active language */}
              {i18n.language === item.code && <Text style={styles.activeIndicator}>Active</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </AppScrollView>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F0F0F0', // Change as needed
    borderRadius: 5,
  },
  largeText: {
    marginRight: 10,
    flex: 1,
  },
  activeLanguage: {
    fontWeight: 'bold',
    color: '#DEB253', // Highlight color for active language
  },
  activeIndicator: {
    color: '#DEB253', // Same as active language color
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#DEB253',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
  },
});

export default ChangeLanguageScreen;
