import { createSlice } from "@reduxjs/toolkit";

import { getCourts } from "../actions/courts.actions";

const initialState = {
  status: "",
  courts: [],
  filteredCourts: [],
  court: {},
};

export const courtsSlice = createSlice({
  name: "courts",
  initialState,
  reducers: {
    setCourt: (state, action) => {
      state.court = action.payload;
    },
    setCourts: (state, action) => {
      state.courts = action.payload;
    },
    setCourtsStatus: (state, action) => {
      state.status = action.payload;
    },
    setFilteredCourts: (state, action) => {
      state.filteredCourts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCourts.fulfilled, (state, action) => {
        state.status = "success";
        state.courts = action.payload;
      })
      .addCase(getCourts.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { setCourt, setCourts, setCourtsStatus, setFilteredCourts } =
  courtsSlice.actions;

export const selectCourts = (state) => state.courts.courts;

export const selectCourt = (state) => state.courts.court;

export const selectCourtStatus = (state) => state.courts.status;

export default courtsSlice.reducer;
