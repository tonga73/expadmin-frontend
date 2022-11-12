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
import {
  selectNotesStatus,
  selectNote,
  setNote,
  setNotesStatus,
} from "../store/slices/notes.slice";

import { getRecord } from "../store/actions/records.actions";
import {
  selectRecord,
  setRecordNotes,
  setRecordsStatus,
} from "../store/slices/records.slice";

const RecordNoteCard = ({ noteData }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedNote, setEditedNote] = useState({});

  const notesStatus = useSelector(selectNotesStatus);
  const note = useSelector(selectNote);

  const record = useSelector(selectRecord);

  const handleEditNote = (e) => {
    if (editedNote.text === noteData.text) {
      setEditMode(false);
      return;
    }

    dispatch(editNote({ id: editedNote.id, req: { text: editedNote.text } }));
  };
  useEffect(() => {
    if (notesStatus === "edited") {
      const noteTextElement = document.getElementById(`note-text-${note.id}`);

      // console.log(noteData, "NOTE DATA");
      // console.log(noteTextElement.innerText, "INNER TEXT");
      noteTextElement.innerHTML = note.text;

      dispatch(setRecordsStatus("loading-notes"));
      dispatch(getRecord(record.id));
      setEditedNote({});
      dispatch(setNote({}));
      dispatch(setNotesStatus(""));
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
          <Box sx={{ p: 1 }}>
            <Typography id={`note-text-${noteData.id}`} variant="h5">
              {noteData.text}
            </Typography>
          </Box>
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
                onClick={() => {
                  setEditMode(true);
                  setEditedNote(noteData);
                  dispatch(setNote(noteData));
                }}
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
            {notesStatus === "editing" ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                rowGap={3}
                py={1.5}
              >
                <Spinner size="55" />
                <Typography variant="h3">Editando nota...</Typography>
                <Typography
                  variant="h6"
                  color="secondary"
                  textTransform="uppercase"
                >
                  Aguarde unos instantes
                </Typography>
              </Box>
            ) : (
              <>
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
                    onClick={() => {
                      setEditMode(false);
                      dispatch(setNote({}));
                    }}
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
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RecordNoteCard;
