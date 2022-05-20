import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import useTheme from '../hooks/useTheme';

export const AppSafeAreaView = (props) => {
  const [theme] = useTheme()

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