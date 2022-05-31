import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userMode: "receiver",
  },
  reducers: {
    switchUserMode: (state, action) => {
      state.userMode = action.payload
    },
  }
})

// Actions
export const { switchUserMode } = userSlice.actions

// Selectors
export const selectUserMode = (state) => state.user.userMode

export default userSlice.reducer;