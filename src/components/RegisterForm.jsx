import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Formik } from "formik";
import * as yup from "yup";

import Spinner from "./Spinner";

import { selectUsersStatus, selectUser } from "../store/slices/users.slice";
import { confirmUser, editUser } from "../store/actions/users.actions";

const RegisterForm = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const usersStatus = useSelector(selectUsersStatus);
  const user = useSelector(selectUser);

  const initialValues = {
    name: user.profile.name.split(" ")[0] || "",
  };

  const userSchema = yup.object().shape({
    name: yup.string(),
  });

  const confirmAccount = (localDisplayName) => {
    if (localDisplayName.length > 0) {
      dispatch(confirmUser({ email: user.profile.email, localDisplayName }));
    }
  };

  const handleConfirmUser = ({ name }) => {
    dispatch(confirmAccount(name));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      {usersStatus === "verifiying" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          rowGap={3}
        >
          <Spinner size="55" />
          <Typography variant="h3">Confirmando cuenta...</Typography>
          <Typography variant="h6" color="secondary" textTransform="uppercase">
            Aguarde unos instantes
          </Typography>
        </Box>
      ) : (
        <>
          <Typography
            variant="h6"
            color="secondary"
            textTransform="uppercase"
            textAlign="center"
            sx={{
              maxWidth: "350px",
              userSelect: "none",
            }}
          >
            confirmá tu cuenta para poder iniciar sesión y acceder al sistema
          </Typography>

          <Box py={1.5} px={3} sx={{ border: `1px solid ${colors.grey[300]}` }}>
            <Typography
              variant="subtitle1"
              color={colors.grey[300]}
              textTransform="uppercase"
              textAlign="center"
              py={1}
            >
              Datos vinculados de Google
            </Typography>
            <Box display="flex" flexDirection="column" gap={0.5} p={1.5}>
              <Divider light textAlign="left">
                <Typography
                  variant="subtitle1"
                  fontWeight={100}
                  color="neutral"
                  textTransform="uppercase"
                >
                  Nombre Completo
                </Typography>
              </Divider>
              <Typography variant="h5">{user.profile.name}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={0.5} p={1.5}>
              <Divider light textAlign="left">
                <Typography
                  variant="subtitle1"
                  fontWeight={100}
                  color="neutral"
                  textTransform="uppercase"
                >
                  Correo Electrónico
                </Typography>
              </Divider>
              <Typography variant="h5">{user.profile.email}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={0.5} p={1.5}>
              <Divider light textAlign="left">
                <Typography
                  variant="subtitle1"
                  fontWeight={100}
                  color="neutral"
                  textTransform="uppercase"
                >
                  Imágen de perfil
                </Typography>
              </Divider>
              <Box
                component="img"
                src={user.profile.picture}
                sx={{
                  borderRadius: "50%",
                  maxHeight: "110px",
                  maxWidth: "110px",
                }}
              />
            </Box>
          </Box>
          <Formik
            onSubmit={handleConfirmUser}
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
                gap={3}
                pb={1.5}
                component="form"
                action=""
                onSubmit={handleSubmit}
              >
                <Typography
                  variant="subtitle1"
                  color={colors.grey[300]}
                  textTransform="uppercase"
                  textAlign="center"
                >
                  Datos del sistema
                </Typography>
                <TextField
                  placeholder="EJ: Martinez c/ Empresa Explotadora, ..."
                  color="warning"
                  type="text"
                  label="Nombre de Usuario"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ width: "350px", m: "0 auto" }}
                />
                {/* MODAL ACTIONS */}
                <Box
                  display="flex"
                  justifyContent="space-around"
                  gap={5}
                  width="100%"
                  sx={{ width: "500px" }}
                >
                  <Button
                    fullWidth
                    color="neutral"
                    size="large"
                    onClick={props.cancelRegistration}
                  >
                    Cancelar
                  </Button>
                  <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                  >
                    Guardar Cambios
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </>
      )}
    </Box>
  );
};

export default RegisterForm;
