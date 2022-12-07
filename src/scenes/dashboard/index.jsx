import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

import Row1 from "./rows/Row1";
import HotRecords from "../../components/HotRecords";
import StatBox from "../../components/StatBox";

import { setRecord, selectRecords } from "../../store/slices/records.slice";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const [isDense, setIsDense] = useState(false);

  const records = useSelector(selectRecords);

  const statUrgente =
    !!records &&
    records.filter((e) => {
      return e.priority === "URGENTE";
    });
  const statPericiaRealizada =
    !!records &&
    records.filter((e) => {
      return e.tracing === "PERICIA_REALIZADA";
    });
  const statHonorariosRegulados =
    !!records &&
    records.filter((e) => {
      return e.tracing === "HONORARIOS_REGULADOS";
    });
  const statEnTratativa =
    !!records &&
    records.filter((e) => {
      return e.tracing === "EN_TRATATIVA_DE_COBRO";
    });

  function generatePercentage(value) {
    return !!records && (records.length * value.length) / 100 / 100;
  }

  useEffect(() => {
    dispatch(setRecord({}));
  }, []);

  return (
    <Box>
      <Header title="INICIO" subtitle="Bienvenido al tablero de estadísticas" />

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="repeat(2, 1fr)"
        columnGap="20px"
        height="75vh"
        sx={{
          color: colors.grey[500],
          "&:hover": {
            color: colors.greenAccent[500],
          },
        }}
        onClick={() => setIsDense(!isDense)}
      >
        <Box
          gridColumn="span 5"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={!!records && records.length}
            titleFontVariant="h1"
            subtitle={"Total"}
            subtitleFontVariant="h2"
            progress={1}
            progressSize={150}
            dense={false}
            icon={
              <AccountBalanceWalletIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 7"
          gridRow="span 1"
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gridTemplateRows="repeat(2, 1fr)"
          gap={1}
          sx={{
            "> *": {
              bgcolor: colors.primary[400],
            },
          }}
        >
          <StatBox
            title={statUrgente.length}
            titleFontVariant="h3"
            subtitle={"Urgente"}
            subtitleFontVariant="h5"
            progress={generatePercentage(statUrgente)}
            progressSize={75}
            dense={false}
            icon={
              <LocalFireDepartmentIcon
                sx={{
                  color: colors.priorityColors["URGENTE"],
                  fontSize: "26px",
                }}
              />
            }
          />
          <StatBox
            title={statPericiaRealizada.length}
            titleFontVariant="h3"
            subtitle={"Pericia Realizada"}
            subtitleFontVariant="h5"
            progress={generatePercentage(statPericiaRealizada)}
            progressSize={75}
            dense={false}
            icon={
              <FactCheckIcon
                sx={{
                  color: colors.tracingColors["PERICIA_REALIZADA"],
                  fontSize: "26px",
                }}
              />
            }
          />
          <StatBox
            title={statHonorariosRegulados.length}
            titleFontVariant="h3"
            subtitle={"Honorarios Regulados"}
            subtitleFontVariant="h5"
            progress={generatePercentage(statHonorariosRegulados)}
            progressSize={75}
            dense={false}
            icon={
              <PriceCheckIcon
                sx={{
                  color: colors.tracingColors["HONORARIOS_REGULADOS"],
                  fontSize: "26px",
                }}
              />
            }
          />
          <StatBox
            title={statEnTratativa.length}
            titleFontVariant="h3"
            subtitle={"En Tratativa de Cobro"}
            subtitleFontVariant="h5"
            progress={generatePercentage(statEnTratativa)}
            progressSize={75}
            dense={false}
            icon={
              <CurrencyExchangeIcon
                sx={{
                  color: colors.tracingColors["EN_TRATATIVA_DE_COBRO"],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
