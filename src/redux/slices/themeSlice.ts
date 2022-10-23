import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "../../constants/theme";

const initialState = {
  theme: lightTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    swithTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

// Actions
export const { swithTheme } = themeSlice.actions;
export default themeSlice.reducer;
