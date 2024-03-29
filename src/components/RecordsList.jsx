import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { tokens } from "../theme";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ReplayIcon from "@mui/icons-material/Replay";

import CustomizedTooltip from "./CustomizedTooltip";
import ScrollObserver from "./ScrollObserver";
import Spinner from "./Spinner";

import { getFilteredRecords } from "../store/actions/records.actions";

import {
  selectRecords,
  selectFilteredRecords,
  selectRecord,
  selectRecordsStatus,
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

  const recordsStatus = useSelector(selectRecordsStatus);

  const filteredRecords = useSelector(selectFilteredRecords);
  const record = useSelector(selectRecord);
  const records = useSelector(selectRecords);

  const handleIntersection = (isIntersecting) => {
    if (
      isIntersecting &&
      filteredRecords.length > 0 &&
      records.length > filteredRecords.length + 10
    ) {
      searchParams.set("take", filteredRecords.length + 10);
      setSearchParams(searchParams);
    }
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  useEffect(() => {
    if (recordsStatus === "success") {
      dispatch(setRecordsStatus(""));
    }
    if (recordsStatus === "edited") {
      dispatch(setRecordsStatus(""));
    }
    if (recordsStatus === "deleted") {
      dispatch(setRecordsStatus(""));
      navigate(`/`);
    }
  }, [recordsStatus, location.search, dispatch, navigate]);

  useEffect(() => {
    if (
      recordsStatus === "created" ||
      recordsStatus === "edited" ||
      recordsStatus === "deleted"
    ) {
      dispatch(getFilteredRecords({}));
      dispatch(setRecordsStatus(""));
    }
  }, [recordsStatus, dispatch]);

  return (
    <Box width="100%" overflow="auto">
      {!!filteredRecords && filteredRecords.length <= 0 ? (
        <>
          <Box
            display="flex"
            flexDirection="column"
            rowGap={1}
            justifyContent="center"
            alignItems="center"
            borderBottom={`4px solid ${
              theme.palette.mode === "dark"
                ? colors.primary[500]
                : colors.grey[700]
            }`}
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
        filteredRecords.map(
          ({ id, order, name, priority, tracing, favorite }, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              columnGap={1.5}
              py="15px"
              pl="7px"
              pr="20px"
              borderBottom={`4px solid ${
                theme.palette.mode === "dark"
                  ? colors.primary[500]
                  : colors.grey[700]
              }`}
              sx={{
                userSelect: "none",
                opacity: recordsStatus !== "" ? 0.1 : 1,
                pointerEvents: recordsStatus !== "" ? "none" : "initial",
                bgcolor:
                  record.id === id
                    ? theme.palette.mode === "dark"
                      ? colors.primary[400]
                      : colors.grey[600]
                    : "initial",
                "&:hover": {
                  bgcolor:
                    record.id === id
                      ? theme.palette.mode === "dark"
                        ? colors.primary[400]
                        : colors.grey[600]
                      : theme.palette.mode === "dark"
                      ? colors.primary[500]
                      : colors.grey[700],
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
                sx={{
                  userSelect: "none",
                  pointerEvents: recordsStatus !== "" ? "none" : "initial",
                }}
              >
                <Box display="flex" alignItems="center">
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
                  <Box display="flex" alignItems="center" sx={{ px: 0.5 }}>
                    {favorite && <PriorityHighIcon color="secondary" />}
                  </Box>
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
          )
        )
      )}
      <ScrollObserver options={options} onIntersection={handleIntersection}>
        <Box
          display="grid"
          justifyContent="center"
          py={1}
          color={colors.grey[500]}
          sx={{ placeItems: "center" }}
        >
          {recordsStatus === "loading" ? (
            <Spinner size={15} />
          ) : (
            <Typography fontWeight={700}>·</Typography>
          )}
        </Box>
      </ScrollObserver>
    </Box>
  );
};

export default RecordsList;
