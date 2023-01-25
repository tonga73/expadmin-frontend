import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import { auth } from "../services/firebase";

import { setSignedIn, setUserProfile } from "../store/slices/users.slice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const keysToRemove = ["token", "profile", "signedIn"];

  const logout = () => {
    auth.signOut();
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    dispatch(setUserProfile(null));
    dispatch(setSignedIn(false));
  };

  return (
    <Box>
      <IconButton
        onClick={logout}
        size="medium"
        aria-label="notifications"
        aria-controls="notifications-popover"
        aria-haspopup="true"
        color="inherit"
      >
        <LogoutIcon />
      </IconButton>
    </Box>
  );
};

export default LogoutButton;
