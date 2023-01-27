import React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

import Spinner from "../components/Spinner";
import GoogleLoginButton from "./GoogleLoginButton";

import { selectUsersStatus } from "../store/slices/users.slice";

const LoginButtons = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const usersStatus = useSelector(selectUsersStatus);

  return usersStatus === "validating" ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      rowGap={3}
    >
      <Spinner size="55" />
      <Typography variant="h3">Validando...</Typography>
      <Typography variant="h6" color="secondary" textTransform="uppercase">
        Aguarde unos instantes
      </Typography>
    </Box>
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <Typography
        variant="h1"
        fontWeight={600}
        textTransform="uppercase"
        sx={{
          color:
            theme.palette.mode === "dark"
              ? colors.primary[100]
              : colors.primary[600],
        }}
      >
        ingreso al sistema
      </Typography>
      <GoogleLoginButton />
    </Box>
  );
};

export default LoginButtons;
