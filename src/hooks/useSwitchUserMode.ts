import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "./useAppStore";
import {
  switchUserMode,
  toggleIsModeSwitch,
} from "@src/redux/slices/userSlice";

export default () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { userMode, isModeSwitch } = useAppSelector((state) => state.user);

  const handleToggleUserMode = (mode) => {
    dispatch(switchUserMode(mode));

    setTimeout(() => {
      dispatch(toggleIsModeSwitch(true));
      navigation.navigate("BottomTabNavigator", { screen: "HomeScreen" });
    }, 750);
  };

  return { userMode, handleToggleUserMode, isModeSwitch };
};
