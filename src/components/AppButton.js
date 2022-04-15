import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default AppButton = ({ 
  label, 
  onPress = () => {} 
}) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
      }}
    >
      <Text 
        style={{ 
          color: COLORS.dark,
          fontSize: SIZES.md,
          fontWeight: 'bold'
        }}
      >{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})