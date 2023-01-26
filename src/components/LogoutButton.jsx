import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import { auth } from "../services/firebase";

import {
  setSignedIn,
  setUserProfile,
  setUserCondition,
} from "../store/slices/users.slice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const keysToRemove = ["token", "profile", "signedIn"];

  const logout = () => {
    auth.signOut();
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    localStorage.setItem("sidebar", false);
    navigate("/login");
    dispatch(setUserCondition(""));
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
