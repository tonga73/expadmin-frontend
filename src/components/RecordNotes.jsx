import { useState, useEffect } from "react";
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

const RecordNoteCard = ({ noteData }) => {
  const [note, setNote] = useState(null);
  const [newNote, setNewNote] = useState(null);

  console.log(note, "NOTE");
  console.log(newNote, "NEWNOTE");

  const handleNewNote = () => {
    if (newNote.text === "") {
      return;
    }
    console.log(newNote, "DISPATCH");
  };

  useEffect(() => {
    if (noteData && noteData.id) {
      setNote(noteData);
    } else if (noteData && noteData.text === "") {
      setNewNote(noteData);
    }
  }, [noteData]);
  return (
    <Card sx={{ minWidth: 275, opacity: !note ? 0.5 : 1 }}>
      <CardContent>
        {note ? (
          <Paper sx={{ p: 1 }}>{note.text}</Paper>
        ) : (
          <TextField
            autoFocus
            disabled={!newNote}
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
            sx={{
              pointerEvents: !newNote ? "none" : "initial",
            }}
          />
        )}
      </CardContent>
      <CardActions>
        <Box
          display="flex"
          justifyContent={note ? "space-between" : "flex-end"}
          sx={{ width: "100%", minHeight: 26 }}
        >
          {note ? (
            <Box>
              <IconButton color="warning" size="small">
                <PushPinIcon />
              </IconButton>
              <IconButton color="warning" size="small">
                <DeleteIcon />
              </IconButton>
            </Box>
          ) : undefined}
          {!newNote ? undefined : (
            <Box display="flex" columnGap={1}>
              <Button
                onClick={() => setNewNote(null)}
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
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

const RecordNotes = () => {
  const [noteData, setNoteData] = useState(null);
  const ExampleNote = {
    id: 1,
    name: "Titulo de la nota",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita quidem modi pariatur deserunt porro illum maxime, voluptate, inventore soluta consequatur similique obcaecati aspernatur cupiditate. Dolorum maiores dolore vitae in culpa.",
  };
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
          endIcon={<NoteAddIcon />}
          color="neutral"
          onClick={() => setNoteData({ text: "" })}
        >
          Crear Nota
        </Button>
        <Button endIcon={<ExpandCircleDownIcon />} color="neutral">
          Mostrar Todas (+5)
        </Button>
      </Box>
      <Box gridColumn="span 4">
        <RecordNoteCard noteData={noteData} />
      </Box>
    </Box>
  );
};

export default RecordNotes;
