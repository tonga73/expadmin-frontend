import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PushPinIcon from "@mui/icons-material/PushPin";

import Spinner from "./Spinner";
import RecordNoteCard from "./RecordNoteCard";
import RecordNoteNewCard from "./RecordNoteNewCard";

import {
  selectNotesStatus,
  setNotesStatus,
  setNote,
} from "../store/slices/notes.slice";

import { setRecordNotes } from "../store/slices/records.slice";

const RecordNotes = ({ notes }) => {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const [newNote, setNewNote] = useState(false);
  const [displayNotes, setDisplayNotes] = useState([]);

  const notesStatus = useSelector(selectNotesStatus);

  useEffect(() => {
    if (notesStatus === "created") {
      setNewNote(false);
      dispatch(setNotesStatus(""));
    }
    if (notesStatus === "edited") {
      setDisplayNotes(notes.slice(0, 3));
    }
    if (notesStatus === "deleted") {
      setDisplayNotes(notes);
      dispatch(setNote({}));
      dispatch(setNotesStatus(""));
    }
    if (notesStatus === "cancel-create") {
      dispatch(setNotesStatus(""));
      setNewNote(false);
    }
  }, [notesStatus]);

  useEffect(() => {
    if (notes === []) {
      setDisplayNotes([]);
    }
    if (notes.length > 0) {
      setDisplayNotes(notes.slice(0, 3));
    }
  }, [notes]);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, minmax(0, 1fr))"
      columnGap={1.5}
    >
      <Box
        gridColumn="span 12"
        display="flex"
        justifyContent="space-between"
        mb={0.5}
      >
        <Button
          disabled={newNote}
          endIcon={<NoteAddIcon />}
          color="neutral"
          onClick={() => {
            dispatch(setNotesStatus("create-note"));
            setNewNote(true);
          }}
        >
          Crear Nota
        </Button>
        <Button endIcon={<ExpandCircleDownIcon />} color="neutral">
          Mostrar Todas (+5)
        </Button>
      </Box>
      <Box
        gridColumn="span 12"
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap={1.5}
      >
        {newNote ? (
          <RecordNoteNewCard
            onClose={() => {
              setNewNote(false);
              dispatch(setNotesStatus(""));
            }}
          />
        ) : undefined}
        {!newNote && notes.length <= 0 ? (
          <>
            <Box gridColumn="span 3" sx={{ textAlign: "center", py: 0.5 }}>
              <Typography fontWeight={700} color={colors.grey[500]}>
                NO HAY NOTAS CREADAS
              </Typography>
            </Box>
          </>
        ) : (
          displayNotes.map((e, index) => (
            <RecordNoteCard key={index} noteData={e} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default RecordNotes;
