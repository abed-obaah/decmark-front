import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "@src/store";

export const uploadProfileImg = createAsyncThunk(
  "account/uploadProfileImg",
  async (data: any, thunkAPI) => {
    try {
      const {
        auth: { userInfo },
      } = thunkAPI.getState() as RootState;
      const config = {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          Accept: "application/json",
          Authorization: `Bearer ${userInfo?.authentication.token}`,
        },
      };
      
      // Update the endpoint to the one that handles image storage in your server
      const response = await axios.post("https://api.decmark.com/v1/user/account/upload-profile-image", data, config);
      
      // Check if the response contains the expected data
      if (response.data && response.data.message) {
        console.log(response.data.message);
        return response.data.message; // You might want to return some relevant data here
      } else {
        console.error("Invalid response format");
        return thunkAPI.rejectWithValue("Invalid response format");
      }
    } catch (err: any) {
      console.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      return thunkAPI.rejectWithValue(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  }
);

interface IAuthProps {
  isLoadingImg: boolean;
  success: any;
  error: any;
}

const initialState: IAuthProps = {
  isLoadingImg: false,
  success: null,
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Upload Image
      .addCase(uploadProfileImg.pending, (state) => {
        state.isLoadingImg = true;
        state.success = null;
        state.error = null;
      })
      .addCase(uploadProfileImg.fulfilled, (state, action) => {
        state.isLoadingImg = false;
        state.success = action.payload; // Update success with the entire payload
        state.error = null;
      })
      .addCase(uploadProfileImg.rejected, (state, action) => {
        state.isLoadingImg = false;
        state.error = action.payload;
      });
  },
});


export default accountSlice.reducer;
