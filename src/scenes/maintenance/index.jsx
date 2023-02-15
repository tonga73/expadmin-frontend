import React, { useEffect } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import EngineeringIcon from "@mui/icons-material/Engineering";

const Maintenance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const countDownDate = new Date("Feb 15, 2023 08:00:00").getTime();

  const x = setInterval(() => {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "EXPIRED";
    }
  }, 1000);

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Box display="grid" height="100vh" sx={{ placeItems: "center" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        rowGap={3}
      >
        <EngineeringIcon sx={{ fontSize: "82px" }} />
        <Typography variant="h3">
          El sistema se encuentra en mantenimiento.
        </Typography>
        <Box display="grid" gap={0.5} sx={{ placeItems: "center" }}>
          <Typography variant="h6" color="secondary" textTransform="uppercase">
            tiempo estimado restante
          </Typography>
          <Typography
            id="countdown"
            variant="h5"
            color="secondary"
            textTransform="uppercase"
            fontWeight="bold"
          ></Typography>
          <Alert severity="info">
            El tiempo real suele ser menor al estimado.
          </Alert>
        </Box>
      </Box>
    </Box>
  );
};

export default Maintenance;
