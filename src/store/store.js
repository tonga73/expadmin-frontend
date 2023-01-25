import { configureStore } from "@reduxjs/toolkit";
import recordsSlice from "./slices/records.slice";
import courtsSlice from "./slices/courts.slice";
import officesSlice from "./slices/offices.slice";
import notesSlice from "./slices/notes.slice";
import notificationsSlice from "./slices/notifications.slice";
import usersSlice from "./slices/users.slice";

export const store = configureStore({
  reducer: {
    records: recordsSlice,
    courts: courtsSlice,
    offices: officesSlice,
    notes: notesSlice,
    notifications: notificationsSlice,
    users: usersSlice,
  },
});
