import React, { useState } from 'react'
import { Pressable, Keyboard } from 'react-native'
import AppButton from '../../components/AppButton'
import OTPField from '../../components/OTPField'
import { SIZES } from '../../constants/theme'
import { AppSafeAreaView, AppScrollView } from '../../components/AppViews';
import { LargeText, MediumText, LinkText } from '../../components/AppText';

export default OTPScreen = () => {
  const [code, setCode] = useState("")
  const [pinReady, setPinReady] = useState(false)
  const MAX_CODE_LENGTH = 5

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <Pressable onPress={Keyboard.dismiss}>
          <LargeText>Verification code</LargeText>
          <MediumText>We have sent a code to your mobile number</MediumText>
          <MediumText style={{ marginBottom: 10 }}>+2348141726099</MediumText>
          <OTPField 
            code={code}
            setCode={setCode}
            setPinReady={setPinReady}
            maxLength={MAX_CODE_LENGTH}
            />
          <Pressable>
            <LinkText 
              style={{ 
                textAlign: 'right', 
                fontSize: SIZES.md,
                marginVertical: 10
              }}
            >Resend code?</LinkText>
          </Pressable>
        </Pressable>
        <AppButton 
          label="Verify"
          disabled={!pinReady}
        />
      </AppScrollView>
    </AppSafeAreaView>
  )
}