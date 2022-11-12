import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PushPinIcon from "@mui/icons-material/PushPin";

import Spinner from "./Spinner";

import { createNote } from "../store/actions/notes.actions";
import { selectNotesStatus } from "../store/slices/notes.slice";

import { selectRecord, setRecordNotes } from "../store/slices/records.slice";

const NewRecordNoteCard = ({ onClose }) => {
  const dispatch = useDispatch();
  const [newNote, setNewNote] = useState(null);

  const notesStatus = useSelector(selectNotesStatus);

  const record = useSelector(selectRecord);

  const handleNewNote = () => {
    if (!newNote) {
      return;
    }

    newNote.recordId = record.id;
    dispatch(createNote(newNote));
  };

  return (
    <Card sx={{ minWidth: 275, opacity: !newNote ? 0.5 : 1 }}>
      <CardContent>
        {notesStatus === "creating" ? (
          <Spinner size="50" />
        ) : (
          <TextField
            autoFocus
            id="outlined-multiline-static"
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
          display="flex"
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

const RecordNoteCard = ({ noteData }) => {
  const handleEditNote = () => {};

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "165px",
      }}
    >
      <CardContent>
        <Paper sx={{ p: 1 }}>
          <Typography variant="h5">{noteData.text}</Typography>
        </Paper>
      </CardContent>
      <CardActions>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ width: "100%", minHeight: 26 }}
        >
          <IconButton color="secondary" size="small">
            <PushPinIcon />
          </IconButton>
          <IconButton color="error" size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

const RecordNotes = ({ notes }) => {
  const [newNote, setNewNote] = useState(false);

  const notesStatus = useSelector(selectNotesStatus);

  useEffect(() => {
    if (notesStatus === "created") {
      setNewNote(false);
    }
  }, [notesStatus]);

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
          onClick={() => setNewNote(true)}
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
        columnGap={1.5}
      >
        {newNote ? (
          <NewRecordNoteCard onClose={() => setNewNote(false)} />
        ) : undefined}
        {notes.map((note, index) => (
          <RecordNoteCard key={index} noteData={note} />
        ))}
      </Box>
    </Box>
  );
};

export default RecordNotes;
