import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import _debounce from "lodash.debounce";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import InputBase from "@mui/material/InputBase";
import { tokens } from "../theme";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import FilterListIcon from "@mui/icons-material/FilterList";

import { dataTracings } from "../data/enumsData";

import Spinner from "./Spinner";

import { getFilteredRecords } from "../store/actions/records.actions";

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

  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      handleSearch({ target: { value: "" } });
    }
  }, []);

  function handleDebounceFn(inputValue) {
    console.log(inputValue, "VALUE");
    if (inputValue.length > 0) {
      dispatch(setRecordsStatus("loading"));
      console.log("POR AQUI");
      searchParams.set("search", inputValue);
      setSearchParams(searchParams);
      dispatch(getFilteredRecords(location.search));
    } else {
      dispatch(setRecordsStatus("loading"));
      console.log("ELSE POR ACUA");
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }

  function handleSearch(event) {
    setSearch(event.target.value);
    debounceFn(event.target.value);
  }

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  useEffect(() => {
    searchParams.set("updatedAt", sortByUpdated);
    setSearchParams(searchParams);
    dispatch(setRecordsStatus("loading"));
    dispatch(getFilteredRecords(location.search));
  }, [location.search, sortByUpdated]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      rowGap={0.5}
      width="100%"
      px={1}
    >
      {/* SEARCH BAR */}
      <Box display="flex" backgroundColor={colors.primary[400]} width="100%">
        <InputBase
          id="searchbar-escape-button"
          placeholder="Buscar"
          value={search}
          endAdornment={
            search.length > 0 ? (
              <Box
                component={Button}
                size="small"
                sx={{
                  mr: 1,
                  bgcolor: colors.primary[600],
                  color: colors.grey[400],
                  cursor: "pointer",
                  border: `solid 1px ${colors.primary[100]}`,
                  "&:hover": {
                    color: colors.grey[300],
                  },
                }}
                onClick={() => handleSearch({ target: { value: "" } })}
              >
                Esc
              </Box>
            ) : undefined
          }
          sx={{ ml: 2, flex: 1, fontSize: "19px" }}
          onChange={handleSearch}
        />
      </Box>
      <Box
        component={Button}
        disabled={recordsStatus !== ""}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        px="15px"
        py="7px"
        width="100%"
        sx={{
          cursor: "pointer",
          userSelect: "none",
          color: colors.grey[400],
          bgcolor: colors.primary[400],
          "&:hover": { color: colors.grey[100] },
        }}
        onClick={() => {
          setSortByUpdated(sortByUpdated === "desc" ? "asc" : "desc");
        }}
      >
        <Typography variant="h5" color={colors.grey[100]} fontWeight="600">
          {sortByUpdated === "desc" ? "Recientes" : "Antiguos"} Primero{" "}
          {`(${!!filteredRecords && filteredRecords.length})`}
        </Typography>
        <SvgIcon>
          {sortByUpdated === "desc" ? (
            <ArrowDownwardIcon />
          ) : (
            <ArrowUpwardIcon />
          )}
        </SvgIcon>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        rowGap={1}
      >
        {(Array.from(searchParams).length > 1 && searchParams.has("tracing")) ||
          (searchParams.has("priority") && (
            <Box display="flex" justifyContent="end" width="100%">
              <Typography
                variant="caption"
                textTransform="uppercase"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: colors.blueAccent[300],
                  },
                }}
                onClick={() => {
                  if (searchParams.has("priority")) {
                    searchParams.delete("priority");
                  }
                  if (searchParams.has("tracing")) {
                    searchParams.delete("tracing");
                  }
                  if (searchParams.has("search")) {
                    handleSearch({ target: { value: "" } });
                  }
                  setSearchParams(searchParams);
                }}
              >
                Borrar Filtros
              </Typography>
            </Box>
          ))}
        <Stack
          direction="column-reverse"
          spacing={1}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          {Array.from(searchParams).map((e, index) => {
            const [param, value] = e;
            if (value === "asc" || value === "desc") {
              return;
            }
            if (param === "search") {
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
                  width: "min-content",
                  justifyContent: "space-between",
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
    </Box>
  );
};

export default RecordFilters;
