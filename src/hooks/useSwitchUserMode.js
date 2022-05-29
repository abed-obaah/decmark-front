import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default useSwitchUserMode = () => {

  useEffect(async () => {
    const appData = await AsyncStorage.getItem("userMode")  
  }, [])

  return []
}