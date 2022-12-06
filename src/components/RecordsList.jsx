import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

import ReplayIcon from "@mui/icons-material/Replay";

import Spinner from "./Spinner";
import RecordContextMenu from "./RecordContextMenu";

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
  const [contextMenuPosition, setContextMenuPosition] = useState({});
  const [contextMenuObjId, setContextMenuObjId] = useState(null);

  const handleContextMenu = async (e) => {
    e.preventDefault();
    const recordId = await e.target.id.replace("record-", "");
    setContextMenuObjId(recordId);
    const xPos = e.pageX - 50 + "px";
    const yPos = e.pageY - 50 + "px";

    console.log(recordId, "ID");

    if (recordId !== "") {
      setContextMenuPosition({
        xPos,
        yPos,
      });
    }
  };

  const handleClickAway = () => {
    setContextMenuPosition({});
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
    if (recordsStatus === "edited" || recordsStatus === "deleted") {
      dispatch(getRecords(location.search));
      dispatch(setRecordsStatus(""));
    }
  }, [recordsStatus, location.search]);

  return (
    <Box width="100%" height="min-content" overflow="auto">
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
        !!filteredRecords &&
        filteredRecords.map(({ id, order, name, priority }, index) => (
          <Box
            id={`record-${id}`}
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
            onContextMenu={handleContextMenu}
            onBlur={() => setContextMenuPosition({})}
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
      <RecordContextMenu
        position={contextMenuPosition}
        contextMenuObjId={contextMenuObjId}
        onClickAway={handleClickAway}
      />
    </Box>
  );
};

export default RecordsList;
