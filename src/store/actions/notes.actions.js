import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchGetNotes,
  fetchNewNote,
  fetchEditNote,
} from "../../app/fetchAPI/notesAPI";

import { setNotesStatus, setNote } from "../slices/notes.slice";
import { setRecordNotes } from "../slices/records.slice";

export const getNotes = createAsyncThunk("notes/fetchGetNotes", async () => {
  const response = await fetchGetNotes();

  return response;
});

export const createNote = createAsyncThunk(
  "notes/fetchNewNote",
  async (note, { dispatch }) => {
    dispatch(setNotesStatus("creating"));
    const response = await fetchNewNote(note);

    dispatch(setRecordNotes(response));
    dispatch(setNotesStatus("created"));
  }
);

export const editNote = createAsyncThunk(
  "notes/fetchEditNote",
  async (note, { dispatch }) => {
    dispatch(setNotesStatus("editing"));
    const response = await fetchEditNote(note);

    dispatch(setNote(response));
    dispatch(setNotesStatus("edited"));
  }
);
