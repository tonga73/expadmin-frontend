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
    setNote: (state, action) => {
      state.note = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setNotesStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setNotesStatus, setNotes, setNote } = notesSlice.actions;

export const selectNotes = (state) => state.notes.notes;

export const selectNote = (state) => state.notes.note;

export const selectNotesStatus = (state) => state.notes.status;

export default notesSlice.reducer;
