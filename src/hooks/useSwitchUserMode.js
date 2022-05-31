import { useSelector, useDispatch } from 'react-redux';
import { selectUserMode, switchUserMode } from '../redux/slices/userSlice';
import { useNavigation } from '@react-navigation/native';

export default useSwitchUserMode = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const userMode = useSelector(selectUserMode) 
  
  const handleToggleUserMode = () => {
    navigation.replace("ProfileStack", { screen: "ModeScreen" })

    if(userMode === "receiver") {
      dispatch(switchUserMode("provider"))
    } else {
      dispatch(switchUserMode("receiver"))
    }
  }

  return [userMode, handleToggleUserMode];
}