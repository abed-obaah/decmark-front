import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { ErrorText } from './AppText'
import { COLORS, SIZES } from '../constants/theme'
import useTheme from '../hooks/useTheme'
import { Feather, Ionicons } from '@expo/vector-icons';

export default AppSearchInput = ({ 
  error, 
  onPress,
  onFocus
}) => {
  const [theme] = useTheme()

  return (
    <View>
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
          style={{
            flex: 1,
            fontSize: SIZES.md,
            color: theme.PRIMARY_TEXT_COLOR
          }}
          placeholder="Search for a service"
          placeholderTextColor={theme.SECONDARY_TEXT_COLOR}
        />
        <TouchableOpacity
          onPress={() => onPress}
          style={{
            backgroundColor: theme.gold,
            borderRadius: SIZES.radius,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.gold,
            padding: 5,
            paddingHorizontal: 7.5
          }}
        >
          <Ionicons name="search-outline" size={20} color="black" />
        </TouchableOpacity>
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
    paddingLeft: 15,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    alignItems: 'center'
  }
})