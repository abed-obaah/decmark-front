import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setTheme } from '../redux/slices/themeSlice';

export default useTheme = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  const handleToggleTheme = () => {
    if(theme.mode === "light") {
      dispatch(setTheme("light"))
    } else {
      dispatch(setTheme("dark"))
    }
  }

  return [theme, handleToggleTheme];
}