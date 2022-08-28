import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    auth: authReducer,
  }
})