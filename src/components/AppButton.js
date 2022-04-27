import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default AppButton = ({ 
  label,
  marginTop,
  background,
  onPress = () => {},
  ...props
}) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        height: 50,
        backgroundColor: props.disabled ?  COLORS.diabledBackground : background ? background : COLORS.primary,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: props.disabled ?  COLORS.diabledBackground : COLORS.primary,
        marginTop: marginTop ? marginTop : 25
      }}
      {...props}
    >
      <Text 
        style={{ 
          color: props.disabled ? COLORS.lightGrey : COLORS.dark,
          fontSize: SIZES.md,
          fontWeight: 'bold'
        }}
      >{label}</Text>
    </TouchableOpacity>
  )
}