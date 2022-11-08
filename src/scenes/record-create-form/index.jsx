import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";

import { newRecord } from "../../store/actions/records.actions";
import { getCourts } from "../../store/actions/courts.actions";
import { getOfficesByCourtId } from "../../store/actions/offices.actions";

import {
  selectRecord,
  selectRecordsStatus,
  setRecordsStatus,
} from "../../store/slices/records.slice";
import {
  selectCourts,
  selectCourtStatus,
  setCourtsStatus,
} from "../../store/slices/courts.slice";
import {
  selectOffices,
  selectOfficesStatus,
  setOfficesStatus,
} from "../../store/slices/offices.slice";

import { dataPriorities, dataTracings } from "../../data/enumsData";

const initialValues = {
  name: "",
  order: "",
  priority: "NULA",
  tracing: "ACEPTA_CARGO",
  court: "",
  officeId: "",
};

const userSchema = yup.object().shape({
  name: yup.string().required("Este campo es obligatorio."),
  order: yup.string().required("Este campo es obligatorio."),
  priority: yup.string().required("Este campo es obligatorio."),
  tracing: yup.string().required("Este campo es obligatorio."),
  court: yup.string().required("Este campo es obligatorio."),
  officeId: yup
    .number()
    .required(
      "Este campo es obligatorio. (DEBE SELECCIONAR UN JUZGADO ANTERIORMENTE)"
    ),
});

const RecordCreateForm = () => {
  const [isMounted, toggle] = useReducer((p) => !p, true);
  const [elementRect, setElementRect] = useState();
  const handleRect = useCallback((node) => {
    setElementRect(node?.values);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const recordsStatus = useSelector(selectRecordsStatus);
  const record = useSelector(selectRecord);
  const courts = useSelector(selectCourts);
  const courtsStatus = useSelector(selectCourtStatus);
  const offices = useSelector(selectOffices);
  const officesStatus = useSelector(selectOfficesStatus);

  const handleFormSubmit = (values) => {
    delete values.court;
    dispatch(newRecord(values));
  };

  useEffect(() => {
    dispatch(setRecordsStatus("creating"));
    dispatch(getCourts({}));
  }, []);

  useEffect(() => {
    if (!!elementRect && elementRect.court !== "") {
      dispatch(getOfficesByCourtId(elementRect.court));
    }
  }, [elementRect]);

  useEffect(() => {
    if (recordsStatus === "created") {
      dispatch(setRecordsStatus(""));
      navigate(`/expedientes/${record.id}`);
    }
    if (officesStatus === "success") {
      dispatch(setOfficesStatus(""));
    }
    if (courtsStatus === "success") {
      dispatch(setCourtsStatus(""));
    }
  }, [recordsStatus, courtsStatus, officesStatus]);

  return (
    <Box m="20px">
      <Header
        title="CREAR EXPEDIENTE"
        subtitle="Formulario para la creación de un Nuevo Expediente."
      />

      {recordsStatus !== "loading" && isMounted ? (
        <Formik
          innerRef={handleRect}
          onSubmit={handleFormSubmit}
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
            <form action="" onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  color="secondary"
                  select
                  label="Prioridad"
                  value={values.priority}
                  name="priority"
                  error={!!touched.priority && !!errors.priority}
                  helperText={touched.priority && errors.priority}
                  onChange={handleChange("priority")}
                  margin="normal"
                  fullWidth
                  sx={{ gridColumn: "span 2" }}
                >
                  {dataPriorities.map((e) => (
                    <MenuItem key={e} value={e}>
                      {e}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  color="secondary"
                  select
                  label="Estado"
                  value={values.tracing}
                  name="tracing"
                  error={!!touched.tracing && !!errors.tracing}
                  helperText={touched.tracing && errors.tracing}
                  onChange={handleChange("tracing")}
                  margin="normal"
                  fullWidth
                  sx={{ gridColumn: "span 2" }}
                >
                  {dataTracings.map((e) => (
                    <MenuItem key={e} value={e}>
                      {e}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  autoFocus
                  placeholder="EJ: 1234/4321, 65574/2019, ..."
                  color="secondary"
                  fullWidth
                  type="text"
                  label="N° de Expediente"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.order}
                  name="order"
                  error={!!touched.order && !!errors.order}
                  helperText={touched.order && errors.order}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  placeholder="EJ: Martinez c/ Empresa Explotadora, ..."
                  color="secondary"
                  fullWidth
                  type="text"
                  label="Carátula del Expediente"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  color="secondary"
                  select
                  label="Juzgado"
                  value={values.court}
                  name="court"
                  error={!!touched.court && !!errors.court}
                  helperText={touched.court && errors.court}
                  onChange={handleChange("court")}
                  margin="normal"
                  fullWidth
                  sx={{ gridColumn: "span 2" }}
                >
                  {courts.map((e, index) => (
                    <MenuItem key={index} value={e.id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  color="secondary"
                  select
                  disabled={values.court === ""}
                  label="Secretaría"
                  value={values.officeId}
                  name="officeId"
                  error={!!touched.officeId && !!errors.officeId}
                  helperText={touched.officeId && errors.officeId}
                  onChange={handleChange("officeId")}
                  margin="normal"
                  fullWidth
                  sx={{ gridColumn: "span 2" }}
                >
                  {offices.map((e, index) => (
                    <MenuItem key={index} value={e.id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Crear Expediente
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          rowGap={3}
          justifyContent="center"
          alignItems="center"
          height="65vh"
        >
          <Spinner size="75" />
          <Typography variant="h3">Creando expediente...</Typography>
          <Typography variant="h6" color="secondary" textTransform="uppercase">
            Será redireccionado al mismo en unos segundos
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default RecordCreateForm;
