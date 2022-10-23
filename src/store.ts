import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./redux/slices/themeSlice";
import userReducer from "./redux/slices/userSlice";
import authReducer from "./redux/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
