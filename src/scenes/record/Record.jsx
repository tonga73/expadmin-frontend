import { useParams } from "react-router-dom";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Record = () => {
  const params = useParams();

  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log(params, "PARAMS ");
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(5, minmax(0, 1fr))"
      gridAutoRows="170px"
      gap="20px"
      p="0 15px"
    >
      <Box
        gridColumn="span 3"
        gridRow="span 2"
        sx={{ height: "100%", bgcolor: "red" }}
      >
        "RECORD PAGE"
      </Box>
      <Box
        gridColumn="span 2"
        gridRow="span 2"
        sx={{ height: "100%", bgcolor: "blue" }}
      >
        "RECORD PAGE"
      </Box>
      <Box
        gridColumn="span 5"
        gridRow="span 1"
        sx={{ height: "100%", bgcolor: "blue" }}
      >
        "RECORD PAGE"
      </Box>
    </Box>
  );
};

export default Record;
