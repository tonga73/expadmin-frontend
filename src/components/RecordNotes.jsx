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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PushPinIcon from "@mui/icons-material/PushPin";

import Spinner from "./Spinner";

import { createNote, editNote } from "../store/actions/notes.actions";
import { selectNotesStatus, selectNote } from "../store/slices/notes.slice";

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
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedNote, setEditedNote] = useState({});

  const notesStatus = useSelector(selectNotesStatus);

  const handleEditNote = (e) => {
    if (editedNote.text === noteData.text) {
      setEditMode(false);
      return;
    }

    dispatch(editNote({ id: editedNote.id, req: { text: editedNote.text } }));
  };

  useEffect(() => {
    if (noteData) {
      setEditedNote(noteData);
    }
  }, [noteData]);

  useEffect(() => {
    if (notesStatus === "edited") {
      setEditedNote({});
      setEditMode(false);
    }
  }, [notesStatus]);

  return (
    <>
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
            <Typography id={`note-text-${noteData.id}`} variant="h5">
              {noteData.text}
            </Typography>
          </Paper>
        </CardContent>
        <CardActions>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ width: "100%", minHeight: 26 }}
          >
            <Box>
              <IconButton color="neutral" size="small">
                <PushPinIcon />
              </IconButton>
              <IconButton
                color="warning"
                size="small"
                onClick={() => setEditMode(true)}
              >
                <EditIcon />
              </IconButton>
            </Box>
            <IconButton color="error" size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
      <Modal
        open={editMode}
        onClose={() => setEditMode(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            rowGap={1.5}
            py={1.5}
            px={2}
            sx={{ width: "30%", bgcolor: "background.paper" }}
          >
            <Box sx={{ width: "100%" }}>
              <TextField
                autoFocus
                id="outlined-multiline-static"
                variant="standard"
                multiline
                rows={4}
                defaultValue={editedNote.text}
                fullWidth
                onChange={(e) =>
                  setEditedNote({ ...noteData, text: e.target.value })
                }
                onFocus={
                  !!editedNote && editedNote.text === ""
                    ? (e) => (e.target.value = "")
                    : undefined
                }
                sx={{
                  input: {
                    whiteSpace: "pre-wrap",
                  },
                }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              columnGap={1}
              sx={{ width: "100%" }}
            >
              <Button
                onClick={() => setEditMode(false)}
                size="small"
                color="neutral"
                variant="contained"
              >
                Cancelar
              </Button>
              <Button onClick={handleEditNote} size="small" color="warning">
                Guardar Edicion
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const RecordNotes = ({ notes }) => {
  const [newNote, setNewNote] = useState(false);
  const [displayNotes, setDisplayNotes] = useState([]);

  const notesStatus = useSelector(selectNotesStatus);
  const note = useSelector(selectNote);

  useEffect(() => {
    if (notesStatus === "created") {
      setNewNote(false);
    } else if (notesStatus === "edited") {
      const noteTextElement = document.getElementById(`note-text-${note.id}`);

      console.log(noteTextElement.innerHTML);
      noteTextElement.innerHTML.replace(noteTextElement.innerHTML, note.text);
    }
  }, [notesStatus]);

  useEffect(() => {
    if (notes) {
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
        {displayNotes.map((note, index) => (
          <RecordNoteCard key={index} noteData={note} />
        ))}
      </Box>
    </Box>
  );
};

export default RecordNotes;
