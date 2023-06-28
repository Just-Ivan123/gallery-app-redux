import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  signedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSignedIn: (state, action) => {
      state.signedIn = action.payload;
    },
    signOutUser: (state) => {
      state.user = {};
      state.signedIn = false;
    },
  },
});

export const { setUser, setSignedIn, signOutUser } = userSlice.actions;
export const selectSignedIn = (state) => state.user.signedIn;

export default userSlice.reducer;