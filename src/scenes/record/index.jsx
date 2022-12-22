import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Formik, Field } from "formik";
import * as yup from "yup";

import RecordDetails from "./sections/RecordDetails";

import Spinner from "../../components/Spinner";
import RecordNotes from "../../components/RecordNotes";
import RecordSelectInput from "../../components/RecordSelectInput";
import ActionsModal from "../../components/ActionsModal";

import { getRecord, editRecord } from "../../store/actions/records.actions";
import {
  setRecords,
  setRecord,
  selectRecord,
  selectRecordsStatus,
  setRecordsStatus,
} from "../../store/slices/records.slice";

const Record = () => {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const params = useParams();

  const [editMode, setEditMode] = useState(false);
  const recordsStatus = useSelector(selectRecordsStatus);
  const record = useSelector(selectRecord);

  const handleEditRecordSubmit = (values) => {
    const { id } = params;
    try {
      if (!!values.order && values.order !== record.order) {
        dispatch(editRecord({ id: id, req: { order: values.order } }));
      }
      if (!!values.name && values.name !== record.name) {
        dispatch(editRecord({ id: id, req: { name: values.name } }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    name: record.name || "",
    order: record.order || "",
  };

  const userSchema = yup.object().shape({
    name: yup.string(),
    order: yup.string(),
  });

  useEffect(() => {
    dispatch(setRecord({}));
    dispatch(setRecords([]));
    dispatch(setRecordsStatus("loading"));
    dispatch(getRecord(params.id));
  }, [params.id, dispatch]);

  useEffect(() => {
    if (recordsStatus === "success" || recordsStatus === "edited") {
      dispatch(setRecordsStatus(""));
      setEditMode(false);
    }
  }, [recordsStatus, dispatch]);

  useEffect(() => {
    if (editMode === true) {
      dispatch(setRecordsStatus("edit-mode"));
    } else {
      dispatch(setRecordsStatus(""));
    }
  }, [editMode, dispatch]);

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
        alignItems="start"
        rowGap={5}
        columnGap={1}
        p="0 15px"
      >
        <Box gridColumn={{ xs: "span 5", lg: "span 3" }}>
          <RecordSelectInput record={record} />
          <Typography variant="h1" fontWeight={700} sx={{ py: 1 }}>
            {record.order}
          </Typography>
          <Typography
            variant="h2"
            textTransform="uppercase"
            fontWeight={700}
            color={colors.grey[500]}
          >
            {record.name}
          </Typography>
          <Button
            disabled={recordsStatus === "editing"}
            color="warning"
            variant="outlined"
            size="small"
            sx={{ mt: 1 }}
            onClick={() => setEditMode(!editMode)}
          >
            Editar
          </Button>
        </Box>
        <Box
          gridColumn={{ xs: "span 5", lg: "span 2" }}
          py={1.9}
          sx={{ height: "100" }}
        >
          <RecordDetails record={record} />
        </Box>
        <Box
          gridColumn="span 5"
          sx={{
            pb: 5,
            opacity:
              recordsStatus === "loading-notes" || recordsStatus === "loading"
                ? 0.5
                : "initial",
            pointerEvents:
              recordsStatus === "loading-notes" || recordsStatus === "loading"
                ? "none"
                : "initial",
          }}
        >
          <RecordNotes
            notes={
              !!record && record.notes !== undefined && record.notes.length > 0
                ? record.notes
                : []
            }
            recordId={record.id}
          />
        </Box>
      </Box>

      {/* RECORD EDIT MODAL */}
      <ActionsModal
        isLoading={recordsStatus === "editing"}
        isOpen={editMode}
        handleOnClose={() => setEditMode(false)}
        handleSubmit={handleEditRecordSubmit}
      >
        <Formik
          onSubmit={handleEditRecordSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Box
              display="flex"
              flexDirection="column"
              gap={1.5}
              pb={1.5}
              component="form"
              action=""
              onSubmit={handleSubmit}
            >
              <TextField
                placeholder="EJ: 1234/4321, 65574/2019, ..."
                color="warning"
                fullWidth
                type="text"
                label="N° de Expediente"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.order}
                name="order"
                error={!!touched.order && !!errors.order}
                helperText={touched.order && errors.order}
              />
              <TextField
                placeholder="EJ: Martinez c/ Empresa Explotadora, ..."
                color="warning"
                fullWidth
                type="text"
                label="Carátula del Expediente"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              {/* MODAL ACTIONS */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  color="neutral"
                  variant="contained"
                  size="small"
                  onClick={() => setEditMode(false)}
                >
                  Cancelar
                </Button>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  textTransform="uppercase"
                  sx={{
                    color: "warning",
                  }}
                >
                  Editando Expediente
                </Typography>
                <Button
                  type="submit"
                  color="warning"
                  variant="outlined"
                  size="small"
                  onClick={handleSubmit}
                >
                  Guardar Cambios
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </ActionsModal>
    </>
  );
};

export default Record;
