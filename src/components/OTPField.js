import React, { useRef, useState, useEffect } from 'react'
import { 
  StyleSheet,
  View,
  TextInput,
  Pressable
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { XtraLargeText } from './AppText';
import useTheme from '../hooks/useTheme';

export default OTPField = ({ code, setCode, setPinReady, maxLength }) => {
  const [theme] = useTheme()

  const codeDigitsArray = new Array(maxLength).fill(0)

  // ref for text input
  const textInputRef = useRef(null)

  const [inputIsFocused, setInputIsFocused] = useState(false)

  const handleOnPress = () => {
    setInputIsFocused(true)
    textInputRef?.current?.focus()
  }

  const handleOnBlur = () => {
    setInputIsFocused(false)
  }

  useEffect(() => {
    setPinReady(code.length === maxLength)
    return () => setPinReady(false)
  }, [code])

  const toCodeDigitInput = (_, index) => {
    const emptyInputChar = ""
    const digit = code[index] || emptyInputChar

    const isCurrentDigit = index === code.length
    const isLastDigit = index === maxLength - 1
    const isCodeFull = code.length === maxLength

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull)

    return (
      <View 
        key={index} 
        style={[
          styles.otpInput,
          inputIsFocused && isDigitFocused ?
            { borderColor: COLORS.gold, backgroundColor: 'transparent', }
            :
            { 
              borderColor: theme.PRIMARY_BORDER_COLOR, 
              backgroundColor: theme.INPUT_BACKGROUND_COLOR
            }
        ]}
      >
        <XtraLargeText style={{ color: theme.PRIMARY_TEXT_COLOR, textAlign: "center" }}>{digit}</XtraLargeText>
      </View>
    )
  }

  return (
    <View style={styles.otpInputSection}>
      <Pressable style={styles.otpInputConatiner} onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </Pressable>
      <TextInput
        style={styles.hiddenInput}
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        keyboardType="number-pad"
        returnKeyType='done'
        textContentType='oneTimeCode'
        ref={textInputRef}
        onBlur={handleOnBlur}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  otpInputSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20 
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0
  },
  otpInputConatiner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  otpInput: {
    minWidth: '18%',
    borderWidth: 1,
    borderRadius: SIZES.radius,
    padding: 10
  },
})