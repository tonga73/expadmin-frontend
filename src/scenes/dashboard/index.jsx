import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Toolbar from "@mui/material/Toolbar";
import SvgIcon from "@mui/material/SvgIcon";

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

import { setRecord } from "../../store/slices/records.slice";

const Dashboard = () => {
  const [isDense, setIsDense] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(setRecord({}));
  }, []);

  return (
    <Box>
      <Header title="INICIO" subtitle="Bienvenido al tablero de estadísticas" />

      {/* GRID & CHARTS */}
      <Box display="grid" gap="5px">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          columnGap="20px"
          sx={{
            color: colors.grey[500],
            "&:hover": {
              color: colors.greenAccent[500],
            },
          }}
          onClick={() => setIsDense(!isDense)}
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
            py={0.5}
          >
            <SvgIcon onClick={() => setIsDense(!isDense)}>
              {isDense ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </SvgIcon>
          </Box>
        </Box>
        <Box
          display="grid"
          gridAutoColumns
          gridAutoRows={isDense ? "175px" : "115px"}
        >
          {/* <HotRecords dense={isDense} /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
