import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  offices: [],
  office: {},
};

export const officesSlice = createSlice({
  name: "offices",
  initialState,
  reducers: {
    setOffices: (state, action) => {
      state.offices = action.payload;
    },
    setOfficesStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setOfficesStatus, setOffices } = officesSlice.actions;

export const selectOffices = (state) => state.offices.offices;

export const selectOffice = (state) => state.offices.office;

export const selectOfficesStatus = (state) => state.offices.status;

export default officesSlice.reducer;
