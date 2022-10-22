import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://api.decmark.com/v1/user";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (inputs: Record<any, any>, { rejectWithValue }) => {
    try {
      await axios.put(BASE_URL + "/auth/register", {
        ...inputs,
        password_confirmation: inputs.password,
      });
    } catch (err) {
      return rejectWithValue(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (inputs: Record<any, any>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(BASE_URL + "/auth/login", {
        ...inputs,
      });
      await AsyncStorage.setItem("user_info", JSON.stringify(data));
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  }
);

interface IAuthProps {
  userInfo: Record<any, any> | null;
  isLoading: boolean;
  success: any;
  error: any;
}

const initialState: IAuthProps = {
  userInfo: null,
  isLoading: false,
  success: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    resetAuth: (state) => {
      state.isLoading = false;
      state.success = null;
      state.error = null;
    },
    logoutUser: (state) => {
      state.userInfo = null;
      AsyncStorage.removeItem("user_info");
    },
  },
  extraReducers(builder) {
    builder
      // REGISTER REDUCERS
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // LOGIN REDUCERS
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuth, logoutUser, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
