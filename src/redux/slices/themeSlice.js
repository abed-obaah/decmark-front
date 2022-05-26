import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../../constants/theme';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: darkTheme
  },
  reducers: {
    setTheme: (state, action) => {
      switch (action.payload) {
        case "light":
          return state.theme = lightTheme
        case "dark":
          return state.theme = darkTheme
        default:
          return state.theme
      }
    }
  }
})

// Actions
export const { setTheme } = themeSlice.actions

// Selectors
export const selectTheme = (state) => state.theme.theme

export default themeSlice.reducer;