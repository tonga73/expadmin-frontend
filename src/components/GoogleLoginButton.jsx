import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase, { signInWithGoogle } from "../services/firebase";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

import Spinner from "../components/Spinner";

import GoogleIcon from "@mui/icons-material/Google";

import { logIn } from "../store/actions/users.actions";
import {
  setUserProfile,
  selectUser,
  selectUsersStatus,
} from "../store/slices/users.slice";

const GoogleLoginButton = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const usersStatus = useSelector(selectUsersStatus);

  const submitGoogleHandler = async () => {
    try {
      const { email } = await signInWithGoogle();

      dispatch(setUserProfile({ email: email }));
      dispatch(logIn(email));
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={submitGoogleHandler}
      variant="contained"
      startIcon={<GoogleIcon />}
      sx={{
        p: 3,
        color:
          theme.palette.mode === "dark"
            ? colors.primary[400]
            : colors.primary[700],
        bgcolor:
          theme.palette.mode === "dark"
            ? colors.primary[200]
            : colors.primary[900],
        "&:hover": {
          color:
            theme.palette.mode === "dark"
              ? colors.primary[500]
              : colors.primary[600],
          bgcolor:
            theme.palette.mode === "dark"
              ? colors.primary[100]
              : colors.primary[900],
        },
      }}
    >
      <Typography fontWeight={600} variant="h5">
        Iniciar Sesión con Google
      </Typography>
    </Button>
  );
};

export default GoogleLoginButton;
