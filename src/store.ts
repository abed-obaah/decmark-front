import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./redux/appSlice";
import authReducer from "./redux/authSlice";
import accountReducer from "./redux/accountSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
