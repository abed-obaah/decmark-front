import React, { useRef, useState, useEffect } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  Pressable
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default OTPField = ({ code, setCode, setPinReady, maxLength }) => {
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
            { borderColor: COLORS.primary, backgroundColor: COLORS.white, }
            :
            { borderColor: COLORS.light, backgroundColor: COLORS.lighter, }
        ]}
      >
        <Text style={styles.otpText}>{digit}</Text>
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
  otpText: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    textAlign: "center",
    color: COLORS.dark
  }
})