import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserMode, switchUserMode } from '../redux/slices/userSlice';
import { useNavigation } from '@react-navigation/native';

export default useSwitchUserMode = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const userMode = useSelector(selectUserMode)

  const [isModeSwitch, setIsModeSwitch] = useState(false)

  useEffect(() => {
    if(isModeSwitch) {
      setTimeout(() => (
        setIsModeSwitch(false),
        handleNavigate()
      ), 5000)
    }
  }, [isModeSwitch])
  

  const handleNavigate = () => {
    if(userMode === "receiver") {
      navigation.navigate("BottomTabNavigator", { screen: "ProviderHomeScreen" })
    } else {
      navigation.navigate("BottomTabNavigator", { screen: "ReceiverHomeScreen" })
    }
  }

  const handleToggleUserMode = () => {
    setIsModeSwitch(true)

    if(userMode === "receiver") {
      dispatch(switchUserMode("provider"))
    } else {
      dispatch(switchUserMode("receiver"))
    }
  }

  return [userMode, isModeSwitch, handleToggleUserMode]
}