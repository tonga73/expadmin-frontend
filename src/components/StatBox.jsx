import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, dense }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  function truncate(string, limit) {
    if (string.length <= limit) {
      return string;
    }

    return string.slice(0, limit) + "...";
  }

  return dense ? (
    <Box width="100%" sx={{ userSelect: "none" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={0.5}
      >
        {icon}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {title}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" sx={{ color: colors.greenAccent[100] }}>
            {truncate(subtitle, 9)}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle size="25" progress={progress} />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box width="100%" p="15px 30px" sx={{ userSelect: "none" }}>
      <Box display="grid" gridTemplateColumns="repeat(2, minmax(0, 1fr))">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
          <Typography variant="h5" sx={{ color: colors.greenAccent[100] }}>
            {subtitle}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <ProgressCircle size="75" progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between"></Box>
    </Box>
  );
};

export default StatBox;
