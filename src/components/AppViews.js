import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';
import { SafeAreaView, ScrollView } from 'react-native';

export const AppSafeAreaView = (props) => {
  const theme = useSelector(selectTheme)

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
      }}
    >
      {props.children}
    </SafeAreaView>
  )
}

export const AppScrollView = (props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    >
      {props.children}
    </ScrollView>
  )
}