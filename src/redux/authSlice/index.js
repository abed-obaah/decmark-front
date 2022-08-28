import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const registerUser = createAsyncThunk(
  'auth/loginUser', 
  async ({ inputs }) => {
    const res = await axios.put('https://staging.decmark.com/v1/user/auth/register', {
      ...inputs
    }, config);

    return res
  }
)

const authSlice = createSlice({
  name: 'login',
  initialState: {
    userInfo: {},
    isLoading: false,
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false
    },
  }
})

export default authSlice.reducer;
