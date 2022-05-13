import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { COLORS, SIZES } from '../constants/theme';
import { AntDesign, Feather } from '@expo/vector-icons';
import { MediumText, ErrorText } from './AppText';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/themeSlice';

export default PhoneNumberInput = ({
  label,
  password,
  error,
  marginTop,
  onFocus = () => {},
  ...props
}) => {
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
              fontWeight: 'bold',
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
          onFocus={() => {
            onFocus()
          }}
          style={{
            flex: 1,
            fontSize: SIZES.md,
            fontWeight: 'bold',
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