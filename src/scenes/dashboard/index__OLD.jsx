import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import HandshakeIcon from "@mui/icons-material/Handshake";
import NearbyErrorIcon from "@mui/icons-material/NearbyError";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

import StatBox from "../../components/StatBox";

import { setRecord, selectRecords } from "../../store/slices/records.slice";
import { getRecords } from "../../store/actions/records.actions";

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
  const statAlta =
    !!records &&
    records.filter((e) => {
      return e.priority === "ALTA";
    });
  const statPericiaRealizada =
    !!records &&
    records.filter((e) => {
      return e.tracing === "PERICIA_REALIZADA";
    });
  const statSentenciaConvenio =
    !!records &&
    records.filter((e) => {
      return e.tracing === "SENTENCIA_O_CONVENIO_DE_PARTES";
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
  const statCobrado =
    !!records &&
    records.filter((e) => {
      return e.tracing === "COBRADO";
    });

  function generatePercentage(value) {
    return !!records && (records.length * value.length) / 100 / 100;
  }

  useEffect(() => {
    dispatch(setRecord({}));
    dispatch(getRecords({}));
  }, [dispatch]);

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
          gridRow="span 2"
          display="grid"
          gap={1}
          gridTemplateColumns="repeat(1, 1fr)"
          gridTemplateRows="repeat(2, 1fr)"
          justifyContent="center"
        >
          <Box
            display="flex"
            gridColumn="span 1"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
            heihgt="100%"
          >
            <StatBox
              type=""
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
            display="flex"
            gridColumn="span 1"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
            heihgt="100%"
          >
            <StatBox
              type="tracing"
              title={statCobrado.length}
              titleFontVariant="h1"
              subtitle={"Cobrado"}
              subtitleFontVariant="h2"
              progress={generatePercentage(statCobrado)}
              progressSize={150}
              dense={false}
              icon={
                <PriceCheckIcon
                  sx={{
                    color: colors.tracingColors["COBRADO"],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 7"
          gridRow="span 2"
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
            type="priority"
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
            type="tracing"
            title={statSentenciaConvenio.length}
            titleFontVariant="h3"
            subtitle={"Sentencia o Convenio de Partes"}
            subtitleFontVariant="h5"
            progress={generatePercentage(statSentenciaConvenio)}
            progressSize={75}
            dense={false}
            icon={
              <HandshakeIcon
                sx={{
                  color: colors.tracingColors["SENTENCIA_O_CONVENIO_DE_PARTES"],
                  fontSize: "26px",
                }}
              />
            }
          />
          <StatBox
            type="priority"
            title={statAlta.length}
            titleFontVariant="h3"
            subtitle={"Alta"}
            subtitleFontVariant="h5"
            progress={generatePercentage(statAlta)}
            progressSize={75}
            dense={false}
            icon={
              <NearbyErrorIcon
                sx={{
                  color: colors.priorityColors["ALTA"],
                  fontSize: "26px",
                }}
              />
            }
          />
          <StatBox
            type="tracing"
            title={statHonorariosRegulados.length}
            titleFontVariant="h3"
            subtitle={"Honorarios Regulados"}
            subtitleFontVariant="h5"
            progress={generatePercentage(statHonorariosRegulados)}
            progressSize={75}
            dense={false}
            icon={
              <PublishedWithChangesIcon
                sx={{
                  color: colors.tracingColors["HONORARIOS_REGULADOS"],
                  fontSize: "26px",
                }}
              />
            }
          />
          <StatBox
            type="tracing"
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
            type="tracing"
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
