import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

import LogoutIcon from "@mui/icons-material/Logout";

import { setUserCondition } from "../store/slices/users.slice";

const Welcome = ({ email }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnContinue = () => {
    dispatch(setUserCondition(""));
    navigate("/");
    return;
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h6" color="secondary" textTransform="uppercase">
        confirmación de registro completa
      </Typography>
      <Box display="grid" gap={1.5} pb={15}>
        <Alert>
          <Typography
            variant="h5"
            color="neutral"
            textAlign="center"
            fontWeight={100}
            fontStyle="italic"
            sx={{
              maxWidth: "500px",
            }}
          >
            Tu cuenta fue confirmada correctamente en el sistema.
          </Typography>
        </Alert>
        <Typography
          variant="h3"
          color="neutral"
          textAlign="center"
          fontWeight={100}
          sx={{
            maxWidth: "500px",
          }}
        >
          A partir de ahora vas a poder iniciar sesión con el usuario de Google
          correspondiente al correo:{" "}
          <div>
            <Typography
              variant="h2"
              color="neutral"
              textAlign="center"
              fontWeight={300}
              sx={{
                mt: 1.5,
                mb: 3,
                py: 3,
                bgcolor: colors.primary[600],
              }}
            >
              {email}
            </Typography>
          </div>
          <Alert severity="info" sx={{ mb: 1.5 }}>
            <Typography
              variant="h5"
              color="neutral"
              textAlign="center"
              fontWeight={100}
              sx={{
                maxWidth: "500px",
              }}
            >
              Información importante
            </Typography>
          </Alert>
          Por defecto la cuenta se mantiene con la sesión iniciada.
          <br />
          <br />
          Se puede usar el botón{" "}
          <Box
            display="inline-flex"
            width="min-content"
            sx={{ bgcolor: colors.primary[600], p: 1 }}
          >
            <LogoutIcon />
          </Box>{" "}
          ubicado en la barra superior para cerrarla.
          <br />
          <br />
          Para facilitar el acceso y la configuración del sistema, algunos datos
          son almacenados en el navegador.
        </Typography>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          sx={{ mt: 5 }}
          onClick={handleOnContinue}
        >
          Continuar
        </Button>
      </Box>
    </Box>
  );
};

export default Welcome;
