import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import Row1 from "./rows/Row1";
import HotRecords from "../../components/HotRecords";
import StatBox from "../../components/StatBox";

const Dashboard = () => {
  const [isDense, setIsDense] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const mainStatsData = [
    {
      title: "2,353",
      subtitle: "Cobrados",
      icon: (
        <AccountBalanceWalletIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
      progress: 0.35,
    },
    {
      title: "2,353",
      subtitle: "Urgentes",
      icon: (
        <LocalFireDepartmentIcon
          sx={{ color: colors.redAccent[500], fontSize: "26px" }}
        />
      ),
      progress: 0.53,
    },
    {
      title: "2,353",
      subtitle: "En Tratativa de Cobro",
      icon: (
        <AccountBalanceWalletIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
      progress: 0.7,
    },
    {
      title: "2,353",
      subtitle: "Total",
      icon: (
        <AccountBalanceWalletIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
      progress: 1,
    },
  ];

  useEffect(() => {}, []);

  return (
    <Box m="0 20px 0 20px">
      <Header title="INICIO" subtitle="Bienvenido al tablero de estadísticas" />

      {/* GRID & CHARTS */}
      <Box display="grid" gap="5px">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          columnGap="20px"
          onClick={
            isDense
              ? () => {
                  setIsDense(!isDense);
                }
              : null
          }
        >
          {mainStatsData.map(({ title, subtitle, icon, progress }, index) => (
            <Box
              key={index}
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={title}
                subtitle={subtitle}
                progress={progress}
                dense={isDense}
                icon={icon}
              />
            </Box>
          ))}
          <Box
            gridColumn="span 12"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ bgColor: "red" }}
          >
            <IconButton size="small" onClick={() => setIsDense(!isDense)}>
              {isDense ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </Box>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, minmax(0, 1fr))"
          gridAutoRows={isDense ? "175px" : "115px"}
          columnGap="20px"
        >
          <HotRecords />
          <Box
            gridColumn="span 9"
            gridRow="span 2"
            sx={{ bgcolor: "blue" }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
