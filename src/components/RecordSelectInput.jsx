import { useState, useEffect, useReducer, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Formik, Field } from "formik";
import * as yup from "yup";

import { dataPriorities, dataTracings } from "../data/enumsData";

import { editRecord } from "../store/actions/records.actions";
import { selectRecordsStatus } from "../store/slices/records.slice";

const RecordSelectInput = ({ record }) => {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const params = useParams();

  const recordsStatus = useSelector(selectRecordsStatus);

  const [isMounted, toggle] = useReducer((p) => !p, true);
  const [elementRect, setElementRect] = useState();
  const handleRect = useCallback((node) => {
    setElementRect(node?.values);
  }, []);

  const initialValues = {
    priority: record.priority || "",
    tracing: record.tracing || "",
  };

  const userSchema = yup.object().shape({
    priority: yup.string(),
    tracing: yup.string(),
  });

  const handleFormSubmit = (values) => {
    const { id } = params;
    try {
      dispatch(editRecord({ id: id, req: values }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isMounted && elementRect !== undefined) {
      const fetchData = async () => {
        if (Number(params.id) === record.id) {
          const { priority, tracing } = await record;
          if (priority !== elementRect.priority) {
            handleFormSubmit({ priority: elementRect.priority });
          }
          if (tracing !== elementRect.tracing) {
            handleFormSubmit({ tracing: elementRect.tracing });
          }
        }
      };
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [elementRect, record, isMounted]);

  useEffect(() => {
    // Input IDs to handle blur
    const priorityInput = document.getElementById("record-form-priority_input");
    const tracingInput = document.getElementById("record-form-tracing_input");
    if (recordsStatus === "edited") {
      priorityInput.blur();
      tracingInput.blur();
    }
  }, [recordsStatus]);
  return isMounted ? (
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
        <Box
          display="flex"
          gap={1}
          component="form"
          action=""
          onSubmit={handleSubmit}
        >
          <TextField
            disabled={recordsStatus === "editing"}
            id="record-form-priority_input"
            color="secondary"
            select
            value={values.priority}
            name="priority"
            error={!!touched.priority && !!errors.priority}
            helperText={touched.priority && errors.priority}
            onChange={handleChange("priority")}
            onBlur={handleBlur}
            margin="normal"
            fullWidth
            sx={{
              input: {
                color: colors.priorityColors[values.priority],
              },
              gridColumn: "span 2",
              bgcolor: colors.priorityColors[values.priority],
            }}
          >
            <Divider light textAlign="right">
              <Typography
                variant="subtitle1"
                fontWeight={100}
                color="neutral"
                textTransform="uppercase"
              >
                Prioridad
              </Typography>
            </Divider>
            {dataPriorities.map((e) => (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            disabled={recordsStatus === "editing"}
            id="record-form-tracing_input"
            color="secondary"
            select
            value={values.tracing}
            name="tracing"
            error={!!touched.tracing && !!errors.tracing}
            helperText={touched.tracing && errors.tracing}
            onChange={handleChange("tracing")}
            onBlur={handleBlur}
            margin="normal"
            fullWidth
            sx={{
              gridColumn: "span 2",
              bgcolor: colors.tracingColors[values.tracing],
            }}
          >
            <Divider light textAlign="right">
              <Typography
                variant="subtitle1"
                fontWeight={100}
                color="neutral"
                textTransform="uppercase"
              >
                Estado pericial
              </Typography>
            </Divider>
            {dataTracings.map((e) => (
              <MenuItem key={e} value={e}>
                {e.replaceAll("_", " ")}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
    </Formik>
  ) : undefined;
};

export default RecordSelectInput;
