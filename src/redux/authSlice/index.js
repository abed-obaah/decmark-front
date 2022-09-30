import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const BASE_URL = 'https://staging.decmark.com/v1/user';
const BASE_URL = 'https://decmark.com/v1/user';

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const registerUser = createAsyncThunk(
  'auth/registerUser', 
  async (inputs, { rejectWithValue }) => {
    try {
      await axios.put(BASE_URL + '/auth/register', {
        ...inputs,
        password_confirmation: inputs.password
      });
    }
    catch(err) {
      return rejectWithValue(
        err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      )
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser', 
  async (inputs, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(BASE_URL + '/auth/login', {
        ...inputs,
      });
      await AsyncStorage.setItem('user_info', JSON.stringify(data))
      return fulfillWithValue(data)
    }
    catch(err) {
      return rejectWithValue(
        err.response && err.response.data.message
        ? err.response.data.message
        : err.message
      )
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    isLoading: false,
    success: null,
    error: null
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    resetAuth: state => {
      state.isLoading = false
      state.success = null
      state.error = null
    },
    logoutUser: state => {
      state.userInfo = null
      AsyncStorage.removeItem('user_info')
    }
  },
  extraReducers: {
    // REGISTER REDUCERS
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state) => {
      state.isLoading = false
      state.success = true
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    // LOGIN REDUCERS
    [loginUser.pending]: state => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.success = true
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const { resetAuth, logoutUser, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
