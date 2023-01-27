import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";

import UnknownUser from "../../components/UnknownUser";
import RegisterForm from "../../components/RegisterForm";
import LoginButtons from "../../components/LoginButtons";
import Welcome from "../../components/Welcome";

import {
  setUserProfile,
  setUserCondition,
  selectUser,
} from "../../store/slices/users.slice";

const Login = (props) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const ValidationStepper = () => {
    const clearStepper = () => {
      dispatch(setUserCondition(""));
      localStorage.removeItem("profile");
      dispatch(setUserProfile(null));
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
  }, [user.condition, user.signedIn, user.profile]);

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
