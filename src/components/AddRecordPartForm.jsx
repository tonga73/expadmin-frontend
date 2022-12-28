import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Formik, Form } from "formik";
import * as yup from "yup";

import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function AddRecordPartForm({ onAddItem, name }) {
  // Estado para controlar si el formulario está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  const validationSchema = yup.object().shape({
    text: yup
      .string()
      .required("El campo es requerido")
      .min(5, "El campo debe tener al menos 5 caracteres"),
  });

  return (
    <Box sx={{ widht: "100%" }}>
      {isOpen ? (
        <Formik
          validationSchema={validationSchema}
          initialValues={{ text: "" }}
          onSubmit={(values, { resetForm }) => {
            // Enviar la acción de Redux con el texto ingresado como el cuerpo
            onAddItem(values.text);
            // Resetear el formulario
            resetForm();
            // Cerrar el formulario
            setIsOpen(false);
          }}
        >
          {({ touched, values, handleChange, handleBlur }) => (
            <Box
              component={Form}
              id={`${name}-form`}
              display="flex"
              flexDirection="column"
              gap={1}
              sx={{ pb: 1 }}
            >
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box>
                  <Tooltip
                    placement="left"
                    title={
                      <Box component={Typography} p={1} sx={{ bgcolor: "" }}>
                        Cancelar
                      </Box>
                    }
                  >
                    <span>
                      <IconButton
                        size="small"
                        color={values.text.length < 1 ? "neutral" : "warning"}
                        onClick={() => setIsOpen(false)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
                <TextField
                  variant="outlined"
                  placeholder="Ingresa el nombre"
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  size="small"
                />
              </Box>
              <Button
                type="submit"
                form={`${name}-form`}
                disabled={values.text.length < 5}
                variant="contained"
                color="success"
                fullWidth
                size="small"
                startIcon={
                  values.text.length >= 5 ? (
                    <PersonAddIcon />
                  ) : (
                    <MoreHorizIcon />
                  )
                }
              >
                {values.text.length >= 5 ? "Agregar" : "Mínimo 5 caracteres"}
              </Button>
            </Box>
          )}
        </Formik>
      ) : (
        <Tooltip
          sx={{ bgcolor: "primary" }}
          title={
            <Box component={Typography} p={1} sx={{ bgcolor: "" }}>
              Ej: "Fulano De Tal", "Aseguradora De Prueba S.R.L", etc...
            </Box>
          }
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<PersonAddIcon />}
            onClick={() => setIsOpen(true)}
          >
            Agregar parte
          </Button>
        </Tooltip>
      )}
    </Box>
  );
}
