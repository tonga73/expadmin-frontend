import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import NoteAddIcon from "@mui/icons-material/NoteAdd";

import Spinner from "./Spinner";

import { pulse } from "../utils/keyframes";

import { createNote } from "../store/actions/notes.actions";
import { selectNotesStatus, setNotesStatus } from "../store/slices/notes.slice";

import { selectRecord } from "../store/slices/records.slice";

const RecordNoteNewCard = ({ onClose }) => {
  const dispatch = useDispatch();
  const [newNote, setNewNote] = useState(null);

  const notesStatus = useSelector(selectNotesStatus);

  const record = useSelector(selectRecord);

  const handleNewNote = () => {
    if (newNote === null) {
      dispatch(setNotesStatus("cancel-create"));
      return;
    }

    newNote.recordId = record.id;
    dispatch(setNotesStatus("creating"));
    dispatch(createNote(newNote));
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        pointerEvents: notesStatus === "creating" ? "none" : "initial",
        opacity: notesStatus === "creating" ? 0.5 : "initial",
        animation:
          notesStatus === "creating"
            ? `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`
            : "initial",
      }}
    >
      <CardContent>
        {notesStatus === "creating" ? (
          <Box
            display="flex"
            width="100%"
            height="100%"
            minHeight="90px"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size="50" />
          </Box>
        ) : (
          <TextField
            autoFocus
            id="create-note-textfield"
            variant="standard"
            multiline
            rows={4}
            placeholder="Escribe una nota..."
            fullWidth
            onChange={(e) => setNewNote({ text: e.target.value })}
            onFocus={
              !!newNote && newNote.text === ""
                ? (e) => (e.target.value = "")
                : undefined
            }
          />
        )}
      </CardContent>
      <CardActions>
        <Box
          display={notesStatus === "creating" ? "none" : "flex"}
          justifyContent={"flex-end"}
          sx={{ width: "100%", minHeight: 26 }}
        >
          <Box display="flex" columnGap={1}>
            <Button
              onClick={onClose}
              size="small"
              color="neutral"
              variant="contained"
            >
              Cancelar
            </Button>
            <Button
              id="create-note-button"
              onClick={handleNewNote}
              size="small"
              color="success"
              startIcon={<NoteAddIcon />}
            >
              Crear Nota
            </Button>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default RecordNoteNewCard;
