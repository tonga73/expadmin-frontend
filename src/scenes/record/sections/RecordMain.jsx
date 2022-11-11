import { useState, useEffect, useReducer, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, Field } from "formik";
import * as yup from "yup";

import Spinner from "../../../components/Spinner";

import { getRecord, editRecord } from "../../../store/actions/records.actions";
import {
  setRecords,
  selectRecord,
  selectRecordsStatus,
} from "../../../store/slices/records.slice";

import { dataPriorities, dataTracings } from "../../../data/enumsData";

const RecordMain = ({ record, isDashboard, onClose }) => {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const [isRecordEdit, setIsRecordEdit] = useState(false);
  const [isMounted, toggle] = useReducer((p) => !p, true);
  const [elementRect, setElementRect] = useState();
  const handleRect = useCallback((node) => {
    setElementRect(node?.values);
  }, []);

  const recordsStatus = useSelector(selectRecordsStatus);

  const initialValues = {
    name: record.name || "",
    order: record.order || "",
    priority: record.priority || "",
    tracing: record.tracing || "",
  };

  const userSchema = yup.object().shape({
    name: yup.string(),
    order: yup.string(),
    priority: yup.string(),
    tracing: yup.string(),
  });

  const handleFormSubmit = async (values) => {
    const { name, order, priority, tracing } = record;
    console.log(
      JSON.stringify(values) ===
        JSON.stringify({ name, order, priority, tracing })
    );
    try {
      const { id } = params;
      if (
        JSON.stringify(values) ===
        JSON.stringify({ name, order, priority, tracing })
      ) {
        setIsRecordEdit(false);
        return;
      }
      if (!!values.order && values.order !== record.order) {
        dispatch(editRecord({ id: id, req: { order: values.order } }));
      }
      if (!!values.name && values.name !== record.name) {
        dispatch(editRecord({ id: id, req: { name: values.name } }));
      }
      dispatch(editRecord({ id: id, req: values }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isDashboard) {
      return;
    } else {
      const fetchData = async () => {
        const { priority, tracing } = await record;

        if (elementRect !== undefined && priority !== undefined) {
          if (priority !== elementRect.priority) {
            handleFormSubmit({ priority: elementRect.priority });
          }
        }
        if (elementRect !== undefined && tracing !== undefined) {
          if (tracing !== elementRect.tracing) {
            handleFormSubmit({ tracing: elementRect.tracing });
          }
        }
      };
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [elementRect, record, isDashboard]);

  useEffect(() => {
    // Input IDs to handle blur
    const priorityInput = document.getElementById("record-form-priority_input");
    const tracingInput = document.getElementById("record-form-tracing_input");
    if (recordsStatus === "edited") {
      priorityInput.blur();
      tracingInput.blur();
      setIsRecordEdit(false);
    }
  }, [recordsStatus]);

  return recordsStatus !== "loading" && record !== undefined && isMounted ? (
    <>
      <Box
        display="flex"
        flexDirection="column"
        rowGap={1}
        px={isDashboard ? 0 : 1.5}
        sx={{ height: "100%" }}
      >
        <Formik
          innerRef={handleRect}
          // enableReinitialize={true}
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
                gap={"15px 30px"}
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  disabled={isDashboard}
                  id="record-form-priority_input"
                  color="warning"
                  select
                  value={values.priority}
                  name="priority"
                  error={!!touched.priority && !!errors.priority}
                  helperText={touched.priority && errors.priority}
                  onChange={handleChange("priority")}
                  onBlur={handleBlur}
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
                  disabled={isDashboard}
                  id="record-form-tracing_input"
                  color="warning"
                  select
                  value={values.tracing}
                  name="tracing"
                  error={!!touched.tracing && !!errors.tracing}
                  helperText={touched.tracing && errors.tracing}
                  onChange={handleChange("tracing")}
                  onBlur={handleBlur}
                  margin="normal"
                  fullWidth
                  sx={{ gridColumn: "span 2" }}
                >
                  {dataTracings.map((e) => (
                    <MenuItem key={e} value={e}>
                      {e.replaceAll("_", " ")}
                    </MenuItem>
                  ))}
                </TextField>
                {isRecordEdit ? (
                  recordsStatus !== "editing" ? (
                    <Box gridColumn="span 4" display="grid" rowGap={3}>
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
                        sx={{ gridColumn: "span 2" }}
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
                        sx={{ gridColumn: "span 2" }}
                      />
                    </Box>
                  ) : (
                    <Box
                      gridColumn="span 4"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      rowGap={1}
                      sx={{ py: 3 }}
                    >
                      <Spinner size="45" />
                      <Typography variant="h3">
                        Editando expediente...
                      </Typography>
                      <Typography
                        variant="h6"
                        color="secondary"
                        textTransform="uppercase"
                      >
                        Aguarde unos instantes
                      </Typography>
                    </Box>
                  )
                ) : (
                  <Box
                    gridColumn="span 4"
                    display="flex"
                    flexDirection="column"
                    rowGap={1}
                  >
                    <Typography variant="h2" fontWeight={700}>
                      {record.order}
                    </Typography>
                    <Typography
                      variant="h1"
                      textTransform="uppercase"
                      fontWeight={700}
                      color={colors.grey[500]}
                    >
                      {record.name}
                    </Typography>
                  </Box>
                )}
                <Box
                  gridColumn="span 4"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    borderBottom: `15px solid ${colors.primary[600]}`,
                    py: 3,
                    px: 1,
                    borderBottomLeftRadius: theme.shape.borderRadius,
                    borderBottomRightRadius: theme.shape.borderRadius,
                  }}
                >
                  {isRecordEdit ? (
                    <>
                      <Button
                        disabled={recordsStatus === "editing"}
                        color="neutral"
                        variant="contained"
                        size="small"
                        onClick={() => setIsRecordEdit(!isRecordEdit)}
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
                        disabled={recordsStatus === "editing"}
                        type="submit"
                        color="warning"
                        variant="outlined"
                        size="small"
                      >
                        Guardar Cambios
                      </Button>
                    </>
                  ) : (
                    !isDashboard && (
                      <Button
                        disabled={recordsStatus === "editing"}
                        color="warning"
                        variant="outlined"
                        size="small"
                        onClick={() => setIsRecordEdit(!isRecordEdit)}
                      >
                        Editar
                      </Button>
                    )
                  )}
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Spinner size="75" />
    </Box>
  );
};

export default RecordMain;
