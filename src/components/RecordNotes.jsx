import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import RecordNoteCard from "./RecordNoteCard";
import RecordNoteNewCard from "./RecordNoteNewCard";

import { pulse } from "../utils/keyframes";

import {
  selectNotesStatus,
  setNotesStatus,
  setNote,
} from "../store/slices/notes.slice";

const RecordNotes = ({ notes }) => {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const [newNote, setNewNote] = useState(false);
  const [displayNotes, setDisplayNotes] = useState({
    notes: [],
    showAll: false,
  });

  const notesStatus = useSelector(selectNotesStatus);

  useEffect(() => {
    if (notesStatus === "created") {
      setNewNote(false);
      dispatch(setNotesStatus(""));
    }
    if (notesStatus === "edited" || notesStatus === "deleted") {
      setDisplayNotes({ notes: notes, showAll: displayNotes.showAll });
      dispatch(setNote({}));
      dispatch(setNotesStatus(""));
    }
    if (notesStatus === "cancel-create") {
      dispatch(setNotesStatus(""));
      setNewNote(false);
    }
  }, [notes, displayNotes.showAll, notesStatus, dispatch]);

  useEffect(() => {
    if (notes === []) {
      setDisplayNotes({ notes: [], showAll: displayNotes.showAll });
    }
    if (displayNotes.showAll === true) {
      setDisplayNotes({ notes: notes, showAll: displayNotes.showAll });
      return;
    } else if (displayNotes.showAll === false) {
      setDisplayNotes({
        notes: notes.slice(
          0,
          notesStatus === "create-note" || notesStatus === "creating" ? 2 : 3
        ),
        showAll: displayNotes.showAll,
      });
      return;
    }
  }, [notes, displayNotes.showAll, notesStatus]);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, minmax(0, 1fr))"
      columnGap={1.5}
      sx={{
        pointerEvents:
          notesStatus === "editing" || notesStatus === "deleting"
            ? "none"
            : "initial",
        opacity:
          notesStatus === "editing" || notesStatus === "deleting"
            ? 0.5
            : "initial",
        animation:
          notesStatus === "editing" || notesStatus === "deleting"
            ? `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`
            : "initial",
      }}
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
        <Button
          onClick={() =>
            setDisplayNotes({
              notes: notes,
              showAll: !displayNotes.showAll,
            })
          }
          endIcon={
            <ExpandCircleDownIcon
              sx={{
                rotate: displayNotes.showAll ? "180deg" : "0deg",
              }}
            />
          }
          color="neutral"
        >
          {displayNotes.showAll
            ? `Mostrar solo recientes | Total: ${notes.length}`
            : `
          Mostrar Todas | Ocultas: (+${
            notes.length > 3 ? notes.length - 3 : 0
          })`}
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
          displayNotes.notes.map((e, index) => (
            <RecordNoteCard key={index} noteData={e} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default RecordNotes;
