import { useSelector, useDispatch } from 'react-redux';
import { selectUserMode, switchUserMode, toggleIsModeSwitch, selectIsModeSwitch } from '../redux/slices/userSlice';
import { useNavigation } from '@react-navigation/native';

export default useSwitchUserMode = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const userMode = useSelector(selectUserMode) 
  const isModeSwitch = useSelector(selectIsModeSwitch) 
  
  const handleToggleUserMode = (mode) => {
    dispatch(switchUserMode(mode))
    
    setTimeout(() => {
      dispatch(toggleIsModeSwitch(true))
      navigation.navigate("BottomTabNavigator", { screen: "HomeScreen" })
    }, 750);
  }

  return [userMode, handleToggleUserMode, isModeSwitch];
}