import { useState, useEffect, useReducer, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

const RecordMain = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isMounted, toggle] = useReducer((p) => !p, true);
  const [elementRect, setElementRect] = useState();
  const handleRect = useCallback((node) => {
    setElementRect(node?.values);
  }, []);

  const recordsStatus = useSelector(selectRecordsStatus);
  const record = useSelector(selectRecord);

  const initialValues = {
    priority: record.priority || "",
    tracing: record.tracing || "",
  };

  const userSchema = yup.object().shape({
    priority: yup.string(),
    tracing: yup.string(),
  });

  const handleFormSubmit = async (values) => {
    try {
      const { id } = params;
      dispatch(editRecord({ id: id, req: values }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
  }, [elementRect, record]);

  useEffect(() => {
    // Input IDs to handle blur
    const priorityInput = document.getElementById("record-form-priority_input");
    const tracingInput = document.getElementById("record-form-tracing_input");
    if (recordsStatus === "edited") {
      priorityInput.blur();
      tracingInput.blur();
    }
  }, [recordsStatus]);

  return recordsStatus !== "loading" && record !== undefined && isMounted ? (
    <>
      <Box display="flex" flexDirection="column" rowGap={1} p={1.5}>
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
                gap={"30px"}
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
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
                  sx={{ gridColumn: "span 2" }}
                >
                  {dataPriorities.map((e) => (
                    <MenuItem key={e} value={e}>
                      {e}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
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
                  sx={{ gridColumn: "span 2" }}
                >
                  {dataTracings.map((e) => (
                    <MenuItem key={e} value={e}>
                      {e.replaceAll("_", " ")}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </form>
          )}
        </Formik>
        <Typography variant="h2" fontWeight={700}>
          {record.order}
        </Typography>
        <Typography variant="h1">{record.name}</Typography>
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
