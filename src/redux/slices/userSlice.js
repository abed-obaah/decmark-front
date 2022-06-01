import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userMode: "receiver",
    isModeSwitch: false
  },
  reducers: {
    switchUserMode: (state, action) => {
      state.userMode = action.payload
    },
    toggleIsModeSwitch: (state, action) => {
      state.isModeSwitch = action.payload
    },
  }
})

// Actions
export const { switchUserMode, toggleIsModeSwitch } = userSlice.actions

// Selectors
export const selectUserMode = (state) => state.user.userMode
export const selectIsModeSwitch = (state) => state.user.isModeSwitch

export default userSlice.reducer;