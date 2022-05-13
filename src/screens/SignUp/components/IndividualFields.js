import React from 'react'
import AppButton from '../../../components/AppButton'
import AppInput from '../../../components/AppInput'
import { View } from 'react-native'
import { SIZES } from '../../../constants/theme'
import { AntDesign } from '@expo/vector-icons';
import { MediumText } from '../../../components/AppText'

export default IndividualFields = ({ theme, toggleReferralID, setToggleReferralID }) => {
  return (
    <>
      <AppInput 
        label="First Name"
      />
      <AppInput 
        label="Last Name"
      />
      <AppInput 
        label="Email"
        autoCapitalize='none'
      />
      <AppInput 
        label="Password"
        password
      />

      <View style={{ marginTop: 20 }}>
        <View 
          style={{
            fontSize: SIZES.md,
            paddingVertical: 2.5,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <AntDesign
            name={toggleReferralID ? "caretdown" : "caretright"}
            style={{ 
              color: theme.SECONDARY_TEXT_COLOR,
              fontSize: 13.5,
              marginRight: 3.5
            }}
            onPress={() => setToggleReferralID(!toggleReferralID)}
          />
          <MediumText onPress={() => setToggleReferralID(!toggleReferralID)}>Referral ID (Optional)</MediumText>
        </View>
        {toggleReferralID &&
          <AppInput marginTop={5} />
        }
      </View>

      <AppButton label="Submit" />
    </>
  )
}