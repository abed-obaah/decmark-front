import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import useTheme from '../hooks/useTheme';

export default AppButton = ({ 
  label,
  marginTop,
  background,
  radius,
  buttonHeight,
  onPress = () => {},
  ...props
}) => {
  const [theme] = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        height: buttonHeight ? buttonHeight : 50,
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