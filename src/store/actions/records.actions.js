import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchGetRecords,
  fetchGetRecord,
  fetchNewRecord,
  fetchEditRecord,
  fetchDeleteRecord,
} from "../../app/fetchAPI/recordsAPI";

import { setRecord, setRecordsStatus } from "../slices/records.slice";

export const getRecords = createAsyncThunk(
  "records/fetchGetRecords",
  async () => {
    const response = await fetchGetRecords();

    return response;
  }
);

export const getRecord = createAsyncThunk(
  "records/fetchGetRecord",
  async (record, { dispatch }) => {
    const response = await fetchGetRecord(record);

    dispatch(setRecord(response));
    return response;
  }
);

export const newRecord = createAsyncThunk(
  "records/fetchNewRecord",
  async (record, { dispatch }) => {
    dispatch(setRecordsStatus("loading"));
    const response = await fetchNewRecord(record);

    dispatch(setRecordsStatus("created"));
    dispatch(setRecord(response));
  }
);

export const removeRecord = createAsyncThunk(
  "records/fetchDeleteRecord",
  async (recordId, { rejectWithValue, dispatch }) => {
    const response = await fetchDeleteRecord(recordId);

    if (response.status === "error") {
      return rejectWithValue(response.msg);
    }

    dispatch(setRecordsStatus("deleted"));
    dispatch(setRecord({}));
  }
);

export const editRecord = createAsyncThunk(
  "records/fetchEditRecord",
  async (record, { dispatch }) => {
    const response = await fetchEditRecord(record);

    dispatch(setRecordsStatus("edited"));
    dispatch(getRecords({}));
    dispatch(setRecord(response));
  }
);
