import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

export default GoBackNavigator = (props) => {
  const navigation = useNavigation();
  
  return (
    <View
      style={{ 
        paddingHorizontal: 20, 
        paddingVertical: 7.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    > 
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name='west'
          style={{ 
            color: COLORS.grey,
            fontSize: 25,
            paddingRight: 5,
          }}
        />
      </TouchableOpacity>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({})