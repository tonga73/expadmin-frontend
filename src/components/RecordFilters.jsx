import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import FilterListIcon from "@mui/icons-material/FilterList";

import { dataTracings } from "../data/enumsData";

import Spinner from "./Spinner";

import { getRecords } from "../store/actions/records.actions";

import {
  selectFilteredRecords,
  selectRecord,
  selectRecordsStatus,
  filterRecords,
  setRecordsStatus,
} from "../store/slices/records.slice";

const RecordFilters = () => {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sortByUpdated, setSortByUpdated] = useState("desc");
  const [sortTracingMenu, setSortTracingMenu] = useState(false);

  const recordsStatus = useSelector(selectRecordsStatus);
  const filteredRecords = useSelector(selectFilteredRecords);
  const record = useSelector(selectRecord);

  useEffect(() => {
    dispatch(filterRecords(search));
  }, [search]);

  useEffect(() => {
    searchParams.set("updatedAt", sortByUpdated);
    setSearchParams(searchParams);
    dispatch(getRecords(location.search));
  }, [location.search, sortByUpdated]);

  return (
    <>
      {" "}
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase
          placeholder="Buscar"
          value={search}
          endAdornment={
            search.length > 0 ? (
              <ClearIcon
                sx={{
                  color: colors.grey[400],
                  cursor: "pointer",
                  "&:hover": {
                    color: colors.grey[300],
                  },
                }}
                onClick={() => {
                  setSearch("");
                }}
              />
            ) : undefined
          }
          sx={{ ml: 2, flex: 1 }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        sx={{
          position: "relative",
          cursor: "pointer",
          userSelect: "none",
          py: 0.1,
          bgcolor: colors.primary[600],
          color: colors.grey[300],
          "&:hover": {
            color: colors.grey[100],
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSortTracingMenu(!sortTracingMenu);
        }}
      >
        <IconButton color="inherit" size="small" disableRipple>
          <FilterListIcon />
        </IconButton>
        <Typography
          color="inherit"
          variant="caption"
          textTransform="uppercase"
          fontWeight="bold"
        >
          Filtrar Estados
        </Typography>
        {sortTracingMenu ? (
          <MenuList
            sx={{
              position: "absolute",
              top: 30,
              bgcolor: colors.primary[600],
              border: `1px solid ${colors.primary[400]}`,
              borderRadius: "1%",
              px: 1,
              zIndex: 999,
            }}
          >
            {dataTracings.map((tracing, index) => (
              <MenuItem
                disableGutters
                sx={{
                  textAlign: "center",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSortTracingMenu(!sortTracingMenu);
                  searchParams.set("tracing", tracing);
                  setSearchParams(searchParams);
                }}
              >
                <ListItemText>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    color={colors.grey[100]}
                    sx={{ color: colors.tracingColors[tracing] }}
                  >
                    {tracing.replaceAll("_", " ")}
                  </Typography>
                </ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        ) : undefined}
      </Box>
      <Box display="flex" justifyContent="space-around" py={1.5}>
        <Stack direction="row" spacing={1}>
          {Array.from(searchParams).map((e, index) => {
            const [param, value] = e;
            if (value === "asc" || value === "desc") {
              return;
            }
            return (
              <Chip
                key={index}
                size="small"
                label={value.replaceAll("_", " ")}
                onDelete={() => {
                  if (param === "priority") {
                    searchParams.delete("priority");
                  }
                  if (param === "tracing") {
                    searchParams.delete("tracing");
                  }
                  setSearchParams(searchParams);
                }}
                sx={{
                  bgcolor:
                    param === "priority"
                      ? colors.priorityColors[value]
                      : colors.tracingColors[value],
                }}
              />
            );
          })}
        </Stack>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        px="15px"
        py="7px"
        sx={{ bgcolor: colors.primary[400] }}
      >
        <Typography variant="h5" color={colors.grey[100]} fontWeight="600">
          {sortByUpdated === "desc" ? "Recientes" : "Antiguos"} Primero{" "}
          {`(${filteredRecords.length})`}
        </Typography>
        <IconButton
          size="small"
          disableRipple
          onClick={() =>
            setSortByUpdated(sortByUpdated === "desc" ? "asc" : "desc")
          }
        >
          {sortByUpdated === "desc" ? (
            <VerticalAlignTopIcon />
          ) : (
            <VerticalAlignBottomIcon />
          )}
        </IconButton>
      </Box>
    </>
  );
};

export default RecordFilters;
