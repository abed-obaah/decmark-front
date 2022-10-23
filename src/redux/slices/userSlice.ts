import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserMode = "receiver" | "provider";

interface IUserProps {
  userMode: UserMode;
  isModeSwitch: boolean;
}

const initialState: IUserProps = {
  userMode: "receiver",
  isModeSwitch: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    switchUserMode: (state, action: PayloadAction<UserMode>) => {
      state.userMode = action.payload;
    },
    toggleIsModeSwitch: (state, action: PayloadAction<boolean>) => {
      state.isModeSwitch = action.payload;
    },
  },
});

// Actions
export const { switchUserMode, toggleIsModeSwitch } = userSlice.actions;
export default userSlice.reducer;
