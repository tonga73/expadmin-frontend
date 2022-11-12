import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchGetNotes,
  fetchNewNote,
  fetchEditNote,
  fetchDeleteNote,
} from "../../app/fetchAPI/notesAPI";

import { setNotesStatus, setNote } from "../slices/notes.slice";
import {
  setRecordNotes,
  setRecordNewNote,
  setRecordDeleteNote,
} from "../slices/records.slice";

export const getNotes = createAsyncThunk("notes/fetchGetNotes", async () => {
  const response = await fetchGetNotes();

  return response;
});

export const createNote = createAsyncThunk(
  "notes/fetchNewNote",
  async (note, { dispatch }) => {
    const response = await fetchNewNote(note);

    dispatch(setRecordNewNote(response));
    dispatch(setNotesStatus("created"));
  }
);

export const editNote = createAsyncThunk(
  "notes/fetchEditNote",
  async (note, { dispatch }) => {
    const response = await fetchEditNote(note);

    dispatch(setNote(response));
    dispatch(setNotesStatus("edited"));
  }
);

export const deleteNote = createAsyncThunk(
  "notes/fetchDeleteNote",
  async (note, { dispatch }) => {
    const response = await fetchDeleteNote(note);

    dispatch(setRecordDeleteNote(response));
    dispatch(setNotesStatus("deleted"));
  }
);
