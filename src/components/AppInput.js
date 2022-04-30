import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { COLORS, SIZES } from '../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import { MediumText, ErrorText } from './AppText';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';

export default AppInput = ({ 
  label,
  password,
  error,
  marginTop,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password)

  const theme = useSelector(selectTheme)

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
            fontWeight: 'bold',
            color: theme.PRIMARY_TEXT_COLOR
          }}
          secureTextEntry={hidePassword}
          {...props}
        />
        {password &&
          <Icon
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
          <IconF 
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
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    alignItems: 'center'
  }
})