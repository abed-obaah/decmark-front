import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const AppInput = (props) => {

  const { label, value, setValue, secureTextEntry } = props

  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default AppInput;