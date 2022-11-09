import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  MenuList,
  MenuItem,
  Modal,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";

import Spinner from "./Spinner";

import { removeRecord } from "../store/actions/records.actions";

import {
  selectRecords,
  selectRecord,
  selectRecordsStatus,
  setRecordsStatus,
} from "../store/slices/records.slice";

const RecordModalDelete = ({ isOpen, handleOnClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const recordsStatus = useSelector(selectRecordsStatus);
  const record = useSelector(selectRecord);

  useEffect(() => {
    if (recordsStatus === "deleted") {
      dispatch(setRecordsStatus(""));
      handleOnClose();
    }
  }, [recordsStatus]);

  return record !== undefined ? (
    <Modal
      open={isOpen}
      onClose={handleOnClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="grid"
        alignItems="center"
        sx={{
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          textTransform="uppercase"
          component="h2"
          sx={{
            placeSelf: "center",
          }}
        >
          Eliminar Expediente
        </Typography>
        <Typography
          variant="caption"
          textTransform="uppercase"
          fontWeight="bold"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            bgcolor: colors.grey[600],
            borderTopLeftRadius: "7px",
            borderTopRightRadius: "7px",
            p: 0.5,
            mt: 2,
            textAlign: "center",
          }}
        >
          <WarningIcon />
          Se eliminará definitivamente el expediente:{" "}
        </Typography>
        <Paper sx={{ p: 1.5 }}>
          {recordsStatus !== "loading" && Object.values(record).length > 0 ? (
            <>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.redAccent[500]}
              >
                {record.order}
              </Typography>
              <Typography variant="h5">{record.name}</Typography>
              <Typography variant="subtitle2" color={colors.grey[500]}>
                Prioridad: {record.priority}
              </Typography>
              <Typography variant="subtitle2" color={colors.grey[500]}>
                Estado:{" "}
                {!!record.tracing && record.tracing.replaceAll("_", " ")}
              </Typography>
            </>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              rowGap={3}
              justifyContent="center"
              alignItems="center"
              py={1}
            >
              <Spinner size="50" />
              <Typography variant="h3">Eliminando expediente...</Typography>
              <Typography
                variant="h6"
                color="secondary"
                textTransform="uppercase"
              >
                Aguarde unos instantes
              </Typography>
            </Box>
          )}
        </Paper>
        {recordsStatus !== "loading" ? (
          <Box display="flex" justifyContent="space-between" sx={{ py: 1 }}>
            <Button
              onClick={handleOnClose}
              size="large"
              variant="contained"
              color="neutral"
            >
              Cancelar
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              size="large"
              variant="outlined"
              color="error"
              onClick={() => {
                dispatch(removeRecord(record.id));
              }}
            >
              Eliminar
            </Button>
          </Box>
        ) : undefined}
      </Box>
    </Modal>
  ) : (
    ""
  );
};

export default RecordModalDelete;
