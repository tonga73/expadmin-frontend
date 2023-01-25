import React from "react";
import { Link } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const UnknownUser = ({ handleRedirect, notVerified }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1.5}
      width="100%"
    >
      <Alert severity={notVerified ? "info" : "warning"}>
        <Typography
          variant="caption"
          textTransform="uppercase"
          fontWeight={900}
          letterSpacing={1.3}
        >
          {notVerified
            ? "necesitas verificar tu cuenta para poder acceder"
            : "tu correo no se encuentra registrado"}
        </Typography>
      </Alert>
      <Typography
        variant="h3"
        fontWeight={600}
        textTransform="uppercase"
        textAlign="center"
        sx={{
          maxWidth: "500px",
          color:
            theme.palette.mode === "dark"
              ? colors.primary[400]
              : colors.primary[600],
        }}
      >
        {notVerified
          ? "contacta con un administrador"
          : "la creación de cuentas está cerrada"}
      </Typography>
      <Button onClick={handleRedirect} color="secondary">
        Volver
      </Button>
    </Box>
  );
};
export default UnknownUser;
