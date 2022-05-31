import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, swithTheme } from '../redux/slices/themeSlice';
import { lightTheme, darkTheme } from '../constants/theme';

export default useTheme = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  const handleToggleTheme = () => {
    if(theme.mode === "light") {
      dispatch(swithTheme(darkTheme))
    } else {
      dispatch(swithTheme(lightTheme))
    }
  }

  return [theme, handleToggleTheme];
}