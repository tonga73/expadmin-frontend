import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchGetOffices,
  fetchGetOfficesByCourtId,
  fetchGetOffice,
} from "../../app/fetchAPI/officesAPI";

import { setOfficesStatus, setOffices } from "../slices/offices.slice";

export const getOffices = createAsyncThunk(
  "offices/fetchGetOffices",
  async () => {
    const response = await fetchGetOffices();

    return response;
  }
);

export const getOfficesByCourtId = createAsyncThunk(
  "offices/fetchGetOfficesByCourtId",
  async (id, { dispatch }) => {
    dispatch(setOfficesStatus("loading"));
    const response = await fetchGetOfficesByCourtId(id);

    dispatch(setOffices(response));
    dispatch(setOfficesStatus("success"));
  }
);
