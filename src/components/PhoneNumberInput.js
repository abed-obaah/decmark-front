import { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { COLORS, SIZES } from '../constants/theme';
import { AntDesign, Feather } from '@expo/vector-icons';
import { MediumText, ErrorText } from './AppText';
import useTheme from '../hooks/useTheme';

export default PhoneNumberInput = ({
  label,
  password,
  error,
  marginTop,
  onFocus = () => {},
  ...props
}) => {
  const [theme] = useTheme()
  const [backgroundColor, setBackgroundColor] = useState(theme.INPUT_BACKGROUND_COLOR)
  const [borderColor, setBorderColor] = useState(theme.PRIMARY_BORDER_COLOR)

  return (
    <View style={{ marginTop: marginTop ? marginTop : 20 }}>
      {label &&
        <MediumText style={{ marginBottom: 3, color: theme.PRIMARY_TEXT_COLOR }}>{label}</MediumText>
      }
      <View 
        style={[
          styles.inputContainer, 
          { backgroundColor },
          error ? 
            { borderColor: COLORS.red } 
          : 
            { borderColor }
        ]}
      >
        <View
          style={{
            paddingRight: 7.5,
            marginRight: 7.5,
            borderRightWidth: 1,
            borderRightColor: theme.PRIMARY_BORDER_COLOR,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <MediumText 
            style={{
              color: theme.PRIMARY_TEXT_COLOR,
              fontFamily: 'FONT_SEMI_BOLD',
              paddingRight: 7.5,
            }}
          >
            +234
          </MediumText>
            <AntDesign
              name="caretdown"
              style={{ 
                color: theme.SECONDARY_TEXT_COLOR,
                fontSize: 10,
              }}
            />
        </View>
        <TextInput
          autoCorrect={false}
          onBlur={() => {
            setBackgroundColor(theme.INPUT_BACKGROUND_COLOR);
            setBorderColor(theme.PRIMARY_BORDER_COLOR)
          }}
          onFocus={() => {
            onFocus();
            setBackgroundColor(theme.PRIMARY_BACKGROUND_COLOR);
            setBorderColor(theme.gold)
          }}
          style={{
            flex: 1,
            height: '100%',
            fontSize: SIZES.md,
            fontFamily: 'FONT_SEMI_BOLD',
            color: theme.PRIMARY_TEXT_COLOR
          }}
          keyboardType="numeric"
          {...props}
        />
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
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    alignItems: 'center'
  }
})