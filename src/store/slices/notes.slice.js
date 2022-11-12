import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  notes: [],
  note: {},
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setNotesStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setNotesStatus, setNotes } = notesSlice.actions;

export const selectNotes = (state) => state.notes.notes;

export const selectNote = (state) => state.notes.note;

export const selectNotesStatus = (state) => state.notes.status;

export default notesSlice.reducer;
