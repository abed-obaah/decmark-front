import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice
  }
})