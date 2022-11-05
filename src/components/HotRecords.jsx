import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import GeographyChart from "./GeographyChart";
import StatBox from "./StatBox";
import ProgressCircle from "./ProgressCircle";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { mockTransactions } from "../data/mockData";

const HotRecords = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      gridColumn="span 4"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      overflow="auto"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Recientes
        </Typography>
      </Box>
      {mockTransactions.map((transaction, i) => (
        <Box
          key={`${transaction.txId}-${i}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          p="15px"
        >
          <Box>
            <Typography
              color={colors.greenAccent[500]}
              variant="h5"
              fontWeight="600"
            >
              1234/4321
            </Typography>
            <Typography color={colors.grey[100]}>
              Primer Persona c/ Segunda Entidad
            </Typography>
          </Box>
          <Box
            backgroundColor={colors.greenAccent[500]}
            p="7px 7px"
            borderRadius="50%"
          ></Box>
        </Box>
      ))}
    </Box>
  );
};

export default HotRecords;
