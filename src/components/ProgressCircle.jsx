import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress = "0.75", size = "40", icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: `radial-gradient(${colors.primary[600]} 55%, transparent 56%), 
            conic-gradient(transparent 0deg ${angle}deg, ${colors.primary[500]} ${angle}deg 360deg), ${colors.greenAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {icon}
    </Box>
  );
};

export default ProgressCircle;
