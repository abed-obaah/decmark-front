import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { COLORS, SIZES } from '../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';

export default AppInput = ({ 
  label,
  password,
  error,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password)

  return (
    <View style={{ marginTop: 20 }}>
      {label &&
        <Text style={styles.label}>{label}</Text>
      }
      <View 
        style={[
          styles.inputContainer, 
          error ? 
            { borderColor: COLORS.red } 
          : 
            { borderColor: COLORS.light }
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
            fontWeight: 'bold'
          }}
          secureTextEntry={hidePassword}
          {...props}
        />
        {password &&
          <Icon
            name={hidePassword ? 'ios-eye-off' : 'ios-eye'}
            style={{ 
              color: COLORS.lightGrey,
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
          <Text style={{ color: COLORS.red }}>{error}</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: SIZES.md,
    color: COLORS.grey
  },
  inputContainer: {
    height: 50,
    backgroundColor: COLORS.lighter,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    alignItems: 'center'
  }
})