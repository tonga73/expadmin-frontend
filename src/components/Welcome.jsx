import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
          variant="h2"
          color="neutral"
          textAlign="center"
          fontWeight={100}
          sx={{
            maxWidth: "500px",
          }}
        >
          Desde ahora vas a poder iniciar sesión con el usuario de Google
          correspondiente al correo:{" "}
          <span>
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
          </span>
          Por defecto la cuenta se mantiene conectada. Para salir, usar el botón{" "}
          <LogoutIcon /> en la barra superior.
          <br />
          <br />
          Para facilitar el acceso y la configuración del sistema, algunos datos
          son guardados en el almacenamiento de su navegador.
        </Typography>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          sx={{ mt: 5 }}
          onClick={() => {
            dispatch(setUserCondition(""));
            navigate("/");
          }}
        >
          Continuar
        </Button>
      </Box>
    </Box>
  );
};

export default Welcome;
