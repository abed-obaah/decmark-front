import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { COLORS, SIZES } from '../constants/theme';
import { Feather } from '@expo/vector-icons';
import { MediumText, ErrorText } from './AppText';
import useTheme from '../hooks/useTheme';

export default AppTextarea = ({ 
  label,
  error,
  marginTop,
  onFocus = () => {}
}) => {
  const [theme] = useTheme()

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
            fontSize: SIZES.md,
            fontFamily: 'FONT_SEMI_BOLD',
            color: theme.PRIMARY_TEXT_COLOR
          }}
          multiline={true}
          numberOfLines={5}
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
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: SIZES.radius,
  }
})