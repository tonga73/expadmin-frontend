import { Box } from "@mui/system";
import LineChart from "../../components/LineChart";
import Header from "../../components/Header";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
