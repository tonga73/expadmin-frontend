import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  user: {
    condition: "",
    profile: JSON.parse(localStorage.getItem("profile")) || null,
    signedIn: localStorage.getItem("signedIn") || false,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersStatus: (state, action) => {
      state.status = action.payload;
    },
    setUserCondition: (state, action) => {
      state.user.condition = action.payload;
    },
    setUserProfile: (state, action) => {
      state.user.profile = action.payload;
    },
    setSignedIn: (state, action) => {
      state.user.signedIn = action.payload;
    },
  },
});

export const { setUsersStatus, setUserCondition, setUserProfile, setSignedIn } =
  usersSlice.actions;

export const selectUser = (state) => state.users.user;

export const selectUsersStatus = (state) => state.users.status;

export default usersSlice.reducer;
