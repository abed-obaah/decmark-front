import React from 'react'
import { 
  View,
  StyleSheet, 
  TouchableOpacity, 
} from 'react-native'
import useTheme from '../hooks/useTheme'
import { MediumText } from './AppText'

export default GroupTab = ({ tabs, activeTab, setActiveTab }) => {
  const [theme] = useTheme()

  return (
    <View 
      style={{ 
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: theme.PRIMARY_BORDER_COLOR,
      }}
    >
      {tabs.map((item, i) =>
        <TouchableOpacity 
          key={i}
          onPress={() => setActiveTab(i)}
          style={{
            paddingHorizontal: 10,
            paddingBottom: 5,
            borderBottomWidth: 3,
            borderBottomColor: activeTab === i ? theme.gold : 'transparent',
          }}
        >
          <MediumText
            style={{ 
              color: activeTab === i ? theme.PRIMARY_TEXT_COLOR : theme.SECONDARY_TEXT_COLOR
            }}
          >
            {item}
          </MediumText>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({})