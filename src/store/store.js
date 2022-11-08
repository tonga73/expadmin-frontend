import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import recordsSlice from "./slices/records.slice";
import courtsSlice from "./slices/courts.slice";
import officesSlice from "./slices/offices.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    records: recordsSlice,
    courts: courtsSlice,
    offices: officesSlice,
  },
});
