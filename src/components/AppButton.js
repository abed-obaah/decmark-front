import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';

export default AppButton = ({ 
  label,
  marginTop,
  background,
  radius,
  onPress = () => {},
  ...props
}) => {
  const theme = useSelector(selectTheme)

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        height: 50,
        backgroundColor: 
          props.disabled ?  
            theme.lightGold 
          : 
            background ? background : theme.gold,
        borderRadius: radius ? radius : SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: props.disabled ?  theme.lightGold : theme.gold,
        marginTop: marginTop ? marginTop : 25
      }}
      {...props}
    >
      <Text 
        style={{ 
          color: 
            props.disabled ? 
              COLORS.lightGrey 
            : 
              background ? theme.PRIMARY_TEXT_COLOR : COLORS.dark,
          fontSize: SIZES.md,
          fontWeight: 'bold'
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}