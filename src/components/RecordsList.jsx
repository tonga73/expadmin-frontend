import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { tokens } from "../theme";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplayIcon from "@mui/icons-material/Replay";

import Spinner from "./Spinner";
import RecordContextMenu from "./RecordContextMenu";
import CustomizedTooltip from "./CustomizedTooltip";

import { getFilteredRecords } from "../store/actions/records.actions";

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
  const [contextMenuPosition, setContextMenuPosition] = useState({});
  const [contextMenuObjId, setContextMenuObjId] = useState(null);

  const handleContextMenu = async (e) => {
    const recordId = await e.target.id.replace("record-", "");
    setContextMenuObjId(recordId);

    console.log(e);

    const xPos = e.pageX - 50 + "px";
    const yPos = e.pageY - 50 + "px";

    if (recordId !== "") {
      setContextMenuPosition({
        xPos,
        yPos,
      });
    }
  };

  useEffect(() => {
    dispatch(filterRecords(search));
  }, [search]);

  useEffect(() => {
    setContextMenuPosition({});
  }, [location]);

  useEffect(() => {
    if (recordsStatus === "success") {
      dispatch(setRecordsStatus(""));
    }
    if (recordsStatus === "edited") {
      dispatch(getFilteredRecords(location.search));
      dispatch(setRecordsStatus(""));
    }
    if (recordsStatus === "deleted") {
      dispatch(getFilteredRecords(location.search));
      dispatch(setRecordsStatus(""));
      navigate(`/`);
    }
  }, [recordsStatus, location.search]);

  useEffect(() => {
    dispatch(getFilteredRecords(location.search));
  }, [location.search]);

  return (
    <Box width="100%" height="100vh" minHeight="min-content" overflow="auto">
      {!!filteredRecords && filteredRecords.length <= 0 ? (
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
              onClick={() => dispatch(getFilteredRecords({}))}
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
        !!filteredRecords &&
        filteredRecords.map(({ id, order, name, priority, tracing }, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            columnGap={1.5}
            py="15px"
            pl="7px"
            pr="20px"
            borderBottom={`4px solid ${colors.primary[500]}`}
            sx={{
              userSelect: "none",
              opacity: recordsStatus !== "" ? 0.1 : 1,
              pointerEvents: recordsStatus !== "" ? "none" : "initial",
              bgcolor: record.id === id ? colors.primary[400] : "initial",
              "&:hover": {
                bgcolor:
                  record.id === id ? colors.primary[400] : colors.primary[500],
              },
            }}
          >
            <Box
              flex="1 1 0%"
              width="90%"
              onClick={() =>
                navigate(
                  `/expedientes/${id}${
                    location.search !== undefined && location.search
                  }`
                )
              }
            >
              <Box
                component={CustomizedTooltip}
                placement="top"
                title={
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    {tracing.replaceAll("_", " ")}
                  </Typography>
                }
                sx={{ bgcolor: "red" }}
              >
                <Typography
                  color={colors.tracingColors[tracing]}
                  variant="h5"
                  fontWeight="600"
                  sx={{
                    width: "min-content",
                    py: 0.5,
                    px: 0.5,
                    borderRadius: "7px",
                    "&:hover": {
                      bgcolor: colors.tracingColors[tracing],
                      color: colors.primary[100],
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    searchParams.set("tracing", tracing);
                    setSearchParams(searchParams);
                  }}
                >
                  {order.replaceAll(" ", "")}
                </Typography>
              </Box>
              <Typography
                fontWeight="600"
                color={colors.grey[100]}
                textTransform="uppercase"
                fontStyle="italic"
                noWrap
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {name}
              </Typography>
            </Box>
            <Box
              flexShrink="1 1 auto"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
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
        <Typography fontWeight={700}>??</Typography>
      </Box>
    </Box>
  );
};

export default RecordsList;
