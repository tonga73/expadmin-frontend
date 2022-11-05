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
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { mockTransactions } from "../../../data/mockData";
import HotRecords from "../../../components/HotRecords";
const Row2 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {/* ROW 2 */}
      <HotRecords />
      <Box
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
      >
        <Box
          mt="25px"
          p="0 30px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Revenue Generated
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              $59,342,32
              <LineChart />
            </Typography>
          </Box>

          <Box>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
        </Box>
        <Box height="250px" mt="-20px">
          <LineChart isDashboard={true} />
        </Box>
      </Box>
    </>
  );
};

export default Row2;
