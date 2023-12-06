import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "@src/store";

const initialState = {
  walletData: null,
  isLoading: false,
  error: null,
};

// Replace with your actual API URL
const WALLET_API_URL = 'https://api.decmark.com/v1/user/wallet';

// Create an async thunk for fetching the wallet data
export const fetchWalletData = createAsyncThunk('wallet/fetchWalletData', async (thunkAPI) => {
  try {
    const {
      auth: { userInfo },
    } =  thunkAPI.getState();

    if (!userInfo) {
      throw new Error('User info not available');
    }

    const config = {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        Accept: "application/json",
        Authorization: `Bearer ${userInfo?.authentication.token}`,
      },
    };

    const response = await axios.get(WALLET_API_URL, config);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWalletData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.walletData = action.payload;
      })
      .addCase(fetchWalletData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default walletSlice.reducer;
