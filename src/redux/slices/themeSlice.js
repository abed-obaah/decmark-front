import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../../constants/theme';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: darkTheme
  },
  reducers: {
    swithTheme: (state, action) => {
      state.theme = action.payload
    }
  }
})

// Actions
export const { swithTheme } = themeSlice.actions

// Selectors
export const selectTheme = (state) => state.theme.theme

export default themeSlice.reducer;