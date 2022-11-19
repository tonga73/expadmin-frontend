import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import { tokens } from "../theme";

import AddBoxIcon from "@mui/icons-material/AddBox";
import ReplayIcon from "@mui/icons-material/Replay";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import Spinner from "./Spinner";
import Header from "../components/Header";

import { getRecords } from "../store/actions/records.actions";

import {
  selectFilteredRecords,
  selectRecordsStatus,
  filterRecords,
  setRecordsStatus,
} from "../store/slices/records.slice";

const RecordsList = () => {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const recordsStatus = useSelector(selectRecordsStatus);
  const filteredRecords = useSelector(selectFilteredRecords);

  useEffect(() => {
    dispatch(filterRecords(search));
  }, [search]);

  useEffect(() => {
    dispatch(getRecords(location.search));
  }, [location.search]);

  useEffect(() => {
    if (recordsStatus === "success") {
      dispatch(setRecordsStatus(""));
    }
  }, [recordsStatus]);

  return (
    <Box width="100%" height="min-content" overflow="auto">
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Buscar"
          endAdornment={<ClearIcon />}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="space-around" py={1.5}>
        <Stack direction="row" spacing={1}>
          {Array.from(searchParams).map((e, index) => {
            const [param, value] = e;
            return (
              <Chip
                key={index}
                size="small"
                label={value.replaceAll("_", " ")}
                onDelete={() => {}}
                sx={{
                  bgcolor:
                    param === "priority"
                      ? colors.priorityColors[value]
                      : colors.tracingColors[value],
                }}
              />
            );
          })}
          {/* <Chip size="small" label="Deletable" onDelete={() => {}} />
          <Chip
            size="small"
            label="Deletable"
            variant="outlined"
            onDelete={() => {}}
          /> */}
        </Stack>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        p="15px"
      >
        <Typography variant="h5" color={colors.grey[100]} fontWeight="600">
          Expedientes Recientes {`(${filteredRecords.length})`}
        </Typography>
        <MenuList sx={{ position: "absolute", bgcolor: "white", width: 260 }}>
          <MenuItem
            onClick={() => {
              searchParams.set("tracing", "ACEPTA_CARGO");
              setSearchParams(searchParams);
            }}
          >
            <ListItemText>Archivar</ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
      {filteredRecords.length <= 0 ? (
        <>
          <Box
            display="flex"
            flexDirection="column"
            rowGap={1}
            justifyContent="center"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Typography
              variant="caption"
              color={colors.grey[100]}
              textTransform="uppercase"
            >
              Presiona para recargar.
            </Typography>
            <Button
              onClick={() => dispatch(getRecords({}))}
              variant="contained"
              endIcon={
                recordsStatus === "loading" ? (
                  <Spinner size="17" />
                ) : (
                  <ReplayIcon />
                )
              }
            >
              Recargar Lista
            </Button>
          </Box>
        </>
      ) : (
        filteredRecords.map(({ id, order, name, priority }, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            columnGap={1.5}
            p="15px"
            borderBottom={`4px solid ${colors.primary[500]}`}
            onClick={() =>
              navigate(
                `/expedientes/${id}${
                  location.search !== undefined && location.search
                }`
              )
            }
          >
            <Box flex="1 1 0%" width="90%" sx={{ pointerEvents: "none" }}>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                {order}
              </Typography>
              <Typography
                fontWeight="600"
                color={colors.grey[100]}
                textTransform="uppercase"
                noWrap
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {name}
              </Typography>
            </Box>
            <Box flexShrink="1 1 auto">
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  searchParams.set("priority", priority);
                  setSearchParams(searchParams);
                }}
                backgroundColor={colors.priorityColors[priority]}
                height="14px"
                width="14px"
                borderRadius="50%"
                sx={{
                  "&:hover": {
                    transform: "scale(1.3)",
                    cursor: "pointer",
                  },
                }}
              ></Box>
            </Box>
          </Box>
        ))
      )}
      <Box
        display="flex"
        justifyContent="center"
        py={1}
        color={colors.grey[500]}
      >
        <Typography fontWeight={700}>·</Typography>
      </Box>
    </Box>
  );
};

export default RecordsList;
