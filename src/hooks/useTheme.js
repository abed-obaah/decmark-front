import { useSelector, useDispatch } from 'react-redux';
import { swithTheme } from '../redux/slices/themeSlice';
import { lightTheme, darkTheme } from '../constants/theme';

export default useTheme = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)

  const handleToggleTheme = () => {
    if(theme.mode === "light") {
      dispatch(swithTheme(darkTheme))
    } else {
      dispatch(swithTheme(lightTheme))
    }
  }

  return [theme, handleToggleTheme];
}