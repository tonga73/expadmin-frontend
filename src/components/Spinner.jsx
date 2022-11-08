import { CircularProgress, Box } from "@mui/material";

const Spinner = ({ size }) => {
  return (
    <Box display="flex">
      <CircularProgress color="secondary" size={Number(size)} />
    </Box>
  );
};

export default Spinner;
