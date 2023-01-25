import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase, { signInWithGoogle } from "../../services/firebase";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Spinner from "../../components/Spinner";
import UnknownUser from "../../components/UnknownUser";
import RegisterForm from "../../components/RegisterForm";
import LoginButtons from "../../components/LoginButtons";
import Welcome from "../../components/Welcome";

import GoogleIcon from "@mui/icons-material/Google";

import { logIn } from "../../store/actions/users.actions";
import {
  setUserProfile,
  setUserCondition,
  selectUser,
  selectUsersStatus,
} from "../../store/slices/users.slice";

const Login = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayName, setDisplayName] = useState(false);

  const user = useSelector(selectUser);
  const usersStatus = useSelector(selectUsersStatus);

  const ValidationStepper = () => {
    const clearStepper = () => {
      dispatch(setUserCondition(""));
      localStorage.removeItem("profile");
      dispatch(setUserProfile(null));
    };

    const validatedRedirect = () => {
      dispatch(setUserCondition(""));
      navigate("/");
    };

    switch (user.condition) {
      case "unknown":
        return <UnknownUser handleRedirect={clearStepper} />;
      case "confirm-registration":
        return (
          <>
            <RegisterForm cancelRegistration={clearStepper} />
          </>
        );
      case "not-verified":
        return <UnknownUser notVerified={true} handleRedirect={clearStepper} />;

      case "verified":
        return <Welcome email={user.profile.email} />;

      case "validated":
        validatedRedirect();
        break;

      default:
        return (
          <>
            <LoginButtons user={user} />
          </>
        );
    }
  };

  useEffect(() => {
    if (user.condition === "confirm-registration") {
      localStorage.setItem("profile", JSON.stringify(user.profile));
    }
    // if (user.signedIn) {
    //   navigate("/");
    // }
  }, [user.condition, user.signedIn]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      minHeight="75vh"
    >
      <ValidationStepper />
    </Box>
  );
};

export default Login;
