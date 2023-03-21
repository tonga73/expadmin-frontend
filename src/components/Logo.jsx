import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { tokens } from "../theme";
import { useTheme } from "@mui/material/";

import { gradient } from "../utils/keyframes";

export const Logo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const styles = {
    text: {
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      background: `linear-gradient(to right, ${colors.greenAccent[500]}, ${colors.blueAccent[500]})`,
      backgroundClip: "text",
      color: "transparent",
      animation: `${gradient} 1s linear infinite`,
    },
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      alignItems="center"
      gap={1.5}
      sx={{ pointerEvents: "none", userSelect: "none" }}
    >
      <Box
        component="img"
        src="../images/hugadminFavicon.png"
        alt="Imagen Logo de Hugadmin."
        height="55px"
        sx={{ boxShadow: 21 }}
      />
      <Typography
        variant="h2"
        textTransform="uppercase"
        fontWeight={100}
        sx={styles.text}
        className="text"
      >
        Hugadmin
      </Typography>
    </Box>
  );
};
