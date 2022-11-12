import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

import RecordMain from "./sections/RecordMain";
import RecordDetails from "./sections/RecordDetails";

import Spinner from "../../components/Spinner";
import RecordNotes from "../../components/RecordNotes";

import { getRecord } from "../../store/actions/records.actions";
import {
  setRecords,
  selectRecord,
  selectRecordsStatus,
  setRecordsStatus,
} from "../../store/slices/records.slice";

const Record = () => {
  const dispatch = useDispatch();
  const params = useParams();

  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const recordsStatus = useSelector(selectRecordsStatus);
  const record = useSelector(selectRecord);

  useEffect(() => {
    dispatch(setRecords([]));
    dispatch(getRecord(params.id));
  }, [params.id]);

  useEffect(() => {
    if (recordsStatus === "success" || recordsStatus === "edited") {
      dispatch(setRecordsStatus(""));
    }
  }, [recordsStatus]);

  return Object.values(record).length < 1 ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      rowGap={3}
      height="75vh"
    >
      <Spinner size="75" />
      <Typography variant="h3">Cargando expediente...</Typography>
      <Typography variant="h6" color="secondary" textTransform="uppercase">
        Aguarde unos instantes
      </Typography>
    </Box>
  ) : (
    <>
      <Box
        gridColumn="span 5"
        sx={{ height: 15, bgcolor: colors.primary[600], mb: 1 }}
      ></Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, minmax(0, 1fr))"
        rowGap={5}
        p="0 15px"
      >
        <Box gridColumn="span 3">
          <RecordMain record={record} />
        </Box>
        <Box gridColumn="span 2" sx={{ height: "100" }}>
          <RecordDetails record={record} />
        </Box>
        <Box gridColumn="span 5" sx={{ pb: 5 }}>
          <RecordNotes notes={record.notes} recordId={record.id} />
        </Box>
      </Box>
    </>
  );
};

export default Record;
