import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import { auth } from "../services/firebase";

const LogoutButton = () => {
  const logout = () => {
    auth.signOut();
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
