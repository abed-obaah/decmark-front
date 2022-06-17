import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { COLORS, SIZES } from '../constants/theme';
import { Ionicons, Feather } from '@expo/vector-icons';
import { MediumText, ErrorText } from './AppText';
import useTheme from '../hooks/useTheme';

export default AppInput = ({ 
  label,
  password,
  error,
  marginTop,
  onFocus = () => {},
  ...props
}) => {
  const [theme] = useTheme()
  const [hidePassword, setHidePassword] = React.useState(password)

  return (
    <View style={{ marginTop: marginTop ? marginTop : 20 }}>
      {label &&
        <MediumText style={{ marginBottom: 3 }}>{label}</MediumText>
      }
      <View 
        style={[
          styles.inputContainer, 
          { backgroundColor: theme.INPUT_BACKGROUND_COLOR },
          error ? 
            { borderColor: COLORS.red } 
          : 
            { borderColor: theme.PRIMARY_BORDER_COLOR }
        ]}
      >
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus()
          }}
          style={{
            flex: 1,
            fontSize: SIZES.md,
            fontFamily: 'FONT_SEMI_BOLD',
            color: theme.PRIMARY_TEXT_COLOR
          }}
          secureTextEntry={hidePassword}
          {...props}
        />
        {password &&
          <Ionicons
            name={hidePassword ? 'ios-eye-off' : 'ios-eye'}
            style={{ 
              color: theme.SECONDARY_TEXT_COLOR,
              fontSize: 22,
              marginLeft: 8 
            }}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      </View>
      {error &&
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Feather 
            name='alert-circle'
            style={{
              color: COLORS.red,
              fontSize: 16,
              paddingRight: 2.5
            }}
          />
          <ErrorText>{error}</ErrorText>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 8.5,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    alignItems: 'center'
  }
})