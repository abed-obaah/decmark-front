import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
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
  const [theme] = useTheme()
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={{ backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, paddingHorizontal: 20, ...props.style }}
    >
      {props.children}
    </ScrollView>
  )
}

export const AppView = (props) => {
  const [theme] = useTheme()

  return (
    <View style={{ backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, ...props.style }}>
      {props.children}
    </View>
  )
}