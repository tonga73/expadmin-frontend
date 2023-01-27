import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import BlurCircularIcon from "@mui/icons-material/BlurCircular";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import HandshakeIcon from "@mui/icons-material/Handshake";
import NearbyErrorIcon from "@mui/icons-material/NearbyError";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

import StatBox from "./StatBox";

import { selectRecords } from "../store/slices/records.slice";
import { getRecords } from "../store/actions/records.actions";

const RecordsStats = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const records = useSelector(selectRecords);

  function generatePercentage(value) {
    const percentage = (records.length * value) / 100 / 100;
    return percentage.toFixed(3);
  }

  const generalStats = [
    {
      title:
        records.length <= 0
          ? null
          : records.filter((e) => {
              return e.tracing === "PERICIA_REALIZADA";
            }).length,
      titleFontVariant: null,
      subtitle: "pericia realizada",
      subtitleFontVariant: null,
      icon: (
        <FactCheckIcon
          sx={{
            color: colors.tracingColors["PERICIA_REALIZADA"],
            fontSize: "26px",
          }}
        />
      ),
      progress: generatePercentage(
        records.filter((e) => {
          return e.tracing === "PERICIA_REALIZADA";
        }).length
      ),
      progressSize: 50,
      type: "tracing",
    },
    {
      title:
        records.length <= 0
          ? null
          : records.filter((e) => {
              return e.tracing === "COBRADO";
            }).length,
      titleFontVariant: null,
      subtitle: "cobrado",
      subtitleFontVariant: null,
      icon: (
        <PriceCheckIcon
          sx={{
            color: colors.tracingColors["COBRADO"],
          }}
        />
      ),
      progress: generatePercentage(
        records.filter((e) => {
          return e.tracing === "COBRADO";
        }).length
      ),
      progressSize: 50,
      type: "tracing",
    },
    {
      title: records.length <= 0 ? null : records.length,
      titleFontVariant: null,
      subtitle: "Total",
      subtitleFontVariant: null,
      icon: (
        <DonutSmallIcon
          sx={{
            color: colors.greenAccent[500],
          }}
        />
      ),
      progress: 1,
      progressSize: 50,
      type: null,
    },
    {
      title:
        records.length <= 0
          ? null
          : records.filter((e) => {
              return e.priority === "INACTIVO";
            }).length,
      titleFontVariant: null,
      subtitle: "inactivo",
      subtitleFontVariant: null,
      icon: (
        <FolderOffIcon
          sx={{
            color: colors.primary[400],
          }}
        />
      ),
      progress: generatePercentage(
        records.filter((e) => {
          return e.priority === "INACTIVO";
        }).length
      ),
      progressSize: 50,
      type: "priority",
    },
    {
      title:
        records.length <= 0
          ? null
          : records.filter((e) => {
              return e.archive === true;
            }).length,
      titleFontVariant: null,
      subtitle: "Archivado",
      subtitleFontVariant: null,
      icon: (
        <InventoryIcon
          sx={{
            color: colors.grey[500],
          }}
        />
      ),
      progress: generatePercentage(
        records.filter((e) => {
          return e.archive === true;
        }).length
      ),
      progressSize: 50,
      type: null,
    },
  ];

  const priorityStats = [
    {
      title:
        records.length <= 0
          ? null
          : records.filter((e) => {
              return e.priority === "MEDIA";
            }).length,
      titleFontVariant: null,
      subtitle: "media",
      subtitleFontVariant: null,
      icon: (
        <BlurCircularIcon
          sx={{
            color: colors.priorityColors["MEDIA"],
            fontSize: "26px",
          }}
        />
      ),
      progress: generatePercentage(
        records.filter((e) => {
          return e.priority === "MEDIA";
        }).length
      ),
      progressSize: 50,
      type: "priority",
    },
    {
      title:
        records.length <= 0
          ? null
          : records.filter((e) => {
              return e.priority === "ALTA";
            }).length,
      titleFontVariant: null,
      subtitle: "ALTA",
      subtitleFontVariant: null,
      icon: (
        <NearbyErrorIcon
          sx={{
            color: colors.priorityColors["ALTA"],
            fontSize: "26px",
          }}
        />
      ),
      progress: generatePercentage(
        records.filter((e) => {
          return e.priority === "ALTA";
        }).length
      ),
      progressSize: 50,
      type: "priority",
    },
    {
      title:
        records.length <= 0
          ? null
          : records.filter((e) => {
              return e.priority === "URGENTE";
            }).length,
      titleFontVariant: null,
      subtitle: "URGENTE",
      subtitleFontVariant: null,
      icon: (
        <LocalFireDepartmentIcon
          sx={{
            color: colors.priorityColors["URGENTE"],
            fontSize: "26px",
          }}
        />
      ),
      progress: generatePercentage(
        records.filter((e) => {
          return e.priority === "URGENTE";
        }).length
      ),
      progressSize: 50,
      type: "priority",
    },
  ];

  const tracingStats = [
    {
      title:
        records.length <= 0
          ? null
          : records.filter((e) => {
              return e.tracing === "SENTENCIA_O_CONVENIO_DE_PARTES";
            }).length,
      titleFontVariant: null,
      subtitle: "Sentencia o convenio de partes",
      subtitleFontVariant: null,
      icon: (
        <HandshakeIcon
          sx={{
            color: colors.tracingColors["SENTENCIA_O_CONVENIO_DE_PARTES"],
            fontSize: "26px",
          }}
        />
      ),
      progress: generatePercentage(
        records.filter((e) => {
          return e.tracing === "SENTENCIA_O_CONVENIO_DE_PARTES";
        }).length
      ),
      progressSize: 50,
      type: "tracing",
    },
    {
      title:
        records.length <= 0
          ? null
          : records.filter((e) => {
              return e.tracing === "HONORARIOS_REGULADOS";
            }).length,
      titleFontVariant: null,
      subtitle: "honorarios regulados",
      subtitleFontVariant: null,
      icon: (
        <PublishedWithChangesIcon
          sx={{
            color: colors.tracingColors["HONORARIOS_REGULADOS"],
            fontSize: "26px",
          }}
        />
      ),
      progress: generatePercentage(
        records.filter((e) => {
          return e.tracing === "HONORARIOS_REGULADOS";
        }).length
      ),
      progressSize: 50,
      type: "tracing",
    },
    {
      title:
        records.length <= 0
          ? null
          : records.filter((e) => {
              return e.tracing === "EN_TRATATIVA_DE_COBRO";
            }).length,
      titleFontVariant: null,
      subtitle: "en tratativa de cobro",
      subtitleFontVariant: null,
      icon: (
        <CurrencyExchangeIcon
          sx={{
            color: colors.tracingColors["EN_TRATATIVA_DE_COBRO"],
            fontSize: "26px",
          }}
        />
      ),
      progress: generatePercentage(
        records.filter((e) => {
          return e.tracing === "EN_TRATATIVA_DE_COBRO";
        }).length
      ),
      progressSize: 50,
      type: "tracing",
    },
  ];

  useEffect(() => {
    dispatch(getRecords({}));
  }, [dispatch]);

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: "minmax(0, 1fr)",
        sm: "repeat(3, minmax(0, 1fr))",
      }}
      gap={1}
      pb={7}
    >
      <Box
        gridColumn="span 3"
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, minmax(0, 1fr))",
          sm: "repeat(5, minmax(0, 1fr))",
        }}
        gap={1}
      >
        {generalStats.map((e, index) => (
          <StatBox key={index} {...e} />
        ))}
      </Box>
      <Box
        gridColumn="span 3"
        display="grid"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        gap={1}
      >
        <Box gridColumn="span 3" mt={1.5}>
          <Divider light textAlign="left" sx={{ px: 1.5 }}>
            <Typography
              variant="h5"
              fontWeight={100}
              color={colors.grey[500]}
              textTransform="uppercase"
            >
              prioridad
            </Typography>
          </Divider>
        </Box>
        {priorityStats.map((e, index) => (
          <StatBox key={index} {...e} />
        ))}
        <Box gridColumn="span 3" mt={1.5}>
          <Divider light textAlign="left" sx={{ px: 1.5 }}>
            <Typography
              variant="h5"
              fontWeight={100}
              color={colors.grey[500]}
              textTransform="uppercase"
            >
              estado pericial
            </Typography>
          </Divider>
        </Box>
        {tracingStats.map((e, index) => (
          <StatBox key={index} {...e} />
        ))}
      </Box>
    </Box>
  );
};

export default RecordsStats;
