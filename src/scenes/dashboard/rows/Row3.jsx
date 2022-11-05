import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";

import { tokens } from "../../../theme";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../../components/LineChart";
import BarChart from "../../../components/BarChart";
import GeographyChart from "../../../components/GeographyChart";
import StatBox from "../../../components/StatBox";
import ProgressCircle from "../../../components/ProgressCircle";
import { mockTransactions } from "../../../data/mockData";
const Row3 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {/* ROW 3 */}
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        p="30px"
      >
        <Typography variant="h5" fontWeight="600">
          Campaign
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt="25px"
        >
          <ProgressCircle size="125" />
          <Typography
            variant="h5"
            color={colors.greenAccent[500]}
            sx={{ mt: "15px" }}
          >
            $48,352 revenue generated
          </Typography>
          <Typography>Includes extra misc expenditures and costs</Typography>
        </Box>
      </Box>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        p="30px"
      >
        <Typography
          variant="h5"
          fontWeight="600"
          sx={{ p: "30px 30px 0 30px" }}
        >
          Sales Quantity
        </Typography>
        <Box height="250px" mt="-20px">
          <BarChart isDashboard={true} />
        </Box>
      </Box>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        p="30px"
      >
        <Typography variant="h5" fontWeight="600" sx={{ mb: "15px" }}>
          Sales Quantity
        </Typography>
        <Box height="200px">
          <GeographyChart isDashboard={true} />
        </Box>
      </Box>
    </>
  );
};

export default Row3;
