import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { getCourts } from "../../store/actions/courts.actions";
import { selectCourts } from "../../store/slices/courts.slice";

import { dataPriorities, dataTracings } from "../../data/enumsData";

const initialValues = {
  name: "",
  order: "",
  priority: "NULA",
  tracing: "ACEPTA_CARGO",
  court: 1,
};

const userSchema = yup.object().shape({
  name: yup.string().required("Este campo es obligatorio."),
  order: yup.string().required("Este campo es obligatorio."),
  priority: yup.string().required("Este campo es obligatorio."),
  tracing: yup.string().required("Este campo es obligatorio."),
});

const RecordCreateForm = () => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const courts = useSelector(selectCourts);

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    dispatch(getCourts({}));
  }, []);

  return (
    <Box m="20px">
      <Header
        title="CREAR EXPEDIENTE"
        subtitle="Formulario para la creación de un Nuevo Expediente."
      />

      <Formik
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
                id="state"
                select
                label="Prioridad"
                value={values.priority}
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
                id="state"
                select
                label="Estado"
                value={values.tracing}
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
                fullWidth
                variant="filled"
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
                fullWidth
                variant="filled"
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
                id="state"
                select
                label="Juzgado"
                value={values.court}
                onChange={handleChange("court")}
                margin="normal"
                fullWidth
                sx={{ gridColumn: "span 2" }}
              >
                {courts !== undefined &&
                  courts.map((e, index) => (
                    <MenuItem key={index} value={e.id}>
                      {e.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RecordCreateForm;
