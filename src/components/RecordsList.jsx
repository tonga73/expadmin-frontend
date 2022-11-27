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

import Spinner from "./Spinner";
import RecordFilters from "./RecordFilters";
import Header from "./Header";

import { getRecords } from "../store/actions/records.actions";

import {
  selectFilteredRecords,
  selectRecord,
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
  const [sortByUpdated, setSortByUpdated] = useState("desc");

  const recordsStatus = useSelector(selectRecordsStatus);
  const filteredRecords = useSelector(selectFilteredRecords);
  const record = useSelector(selectRecord);

  useEffect(() => {
    dispatch(filterRecords(search));
  }, [search]);

  useEffect(() => {
    if (recordsStatus === "success") {
      dispatch(setRecordsStatus(""));
    }
    if (recordsStatus === "edited") {
      dispatch(getRecords(location.search));
      dispatch(setRecordsStatus(""));
    }
  }, [recordsStatus, location.search]);

  return (
    <Box width="100%" height="min-content" overflow="auto">
      <RecordFilters />
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
            sx={{
              userSelect: "none",
              opacity: recordsStatus !== "" ? 0.5 : 1,
              pointerEvents: recordsStatus !== "" ? "none" : "initial",
              bgcolor: record.id === id ? colors.primary[400] : "initial",
              "&:hover": {
                bgcolor:
                  record.id === id ? colors.primary[400] : colors.primary[500],
              },
            }}
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
