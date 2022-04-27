import React, { useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  Pressable, 
  Keyboard,
  SafeAreaView,
  ScrollView
} from 'react-native'
import AppButton from '../../components/AppButton'
import OTPField from '../../components/OTPField'
import { COLORS, SIZES } from '../../constants/theme'

export default OTPScreen = () => {
  const [code, setCode] = useState("")
  const [pinReady, setPinReady] = useState(false)
  const MAX_CODE_LENGTH = 5

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        style={{ paddingHorizontal: 20 }}
      >
        <Pressable onPress={Keyboard.dismiss}>
          <Text 
            style={{
              fontSize: SIZES.xl,
              fontWeight: 'bold',
              color: COLORS.dark,
              marginBottom: 5
            }}
            >Verification code</Text>
          <Text 
            style={{
              color: COLORS.grey,
              fontSize: SIZES.md,
              marginBottom: 2.5
            }}
          >We have sent a code to your mobile number</Text>
          <Text 
            style={{
              color: COLORS.grey,
              fontSize: SIZES.md,
              marginBottom: 10
            }}
          >+2348141726099</Text>
          <OTPField 
            code={code}
            setCode={setCode}
            setPinReady={setPinReady}
            maxLength={MAX_CODE_LENGTH}
            />
          <Pressable>
            <Text 
              style={{ 
                textAlign: 'right', 
                color: COLORS.darkGold,
                fontSize: SIZES.md,
                marginVertical: 10
              }}
            >Resend code?</Text>
          </Pressable>
        </Pressable>
        <AppButton 
          label="Verify"
          disabled={!pinReady}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  }
})