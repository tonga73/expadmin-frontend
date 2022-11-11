import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import { tokens } from "../theme";

import DeleteIcon from "@mui/icons-material/Delete";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import ArchiveIcon from "@mui/icons-material/Archive";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Spinner from "./Spinner";
import RecordContextMenu from "./RecordContextMenu";
import RecordModalDelete from "./RecordModalDelete";

import {
  selectRecords,
  selectRecord,
  selectRecordsStatus,
  setRecordsStatus,
  setRecord,
} from "../store/slices/records.slice";
import { getRecords, getRecord } from "../store/actions/records.actions";

const HotRecords = ({ dense }) => {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contextMenuPosition, setContextMenuPosition] = useState({});
  const [contextMenuObjId, setContextMenuObjId] = useState(null);
  const [modal, setModal] = useState(false);

  const recordsStatus = useSelector(selectRecordsStatus);
  const records = useSelector(selectRecords);
  const [selectedRecord, setSelectedRecord] = useState({});

  const handleContextMenu = async (e) => {
    e.preventDefault();
    const recordId = await e.target.id.replace("record-", "");
    setContextMenuObjId(recordId);
    const xPos = e.pageX - 50 + "px";
    const yPos = e.pageY - 100 + "px";

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
    dispatch(setRecord({}));
    dispatch(getRecords({}));
  }, []);

  useEffect(() => {
    if (recordsStatus === "success") {
      dispatch(setRecordsStatus(""));
    }
    if (recordsStatus === "deleted") {
      dispatch(getRecords({}));
    }
  }, [recordsStatus]);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, minmax(0, 1fr))"
      gridAutoRows={{
        xs: dense ? "175px" : "130px",
        lg: dense ? "200px" : "155px",
        xl: dense ? "370px" : "335px",
      }}
      columnGap="20px"
    >
      <Box
        gridColumn={{ xs: "span 12", sm: "span 4" }}
        gridRow={{ xs: "span 2", sm: "span 2" }}
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          colors={colors.grey[100]}
          p="15px"
        >
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Recientes [{records.length}]
          </Typography>
        </Box>
        {/* LIST RECORDS (Button Reload prints if no records.) */}
        {records.length <= 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            rowGap={1}
            justifyContent="center"
            alignItems="center"
            sx={{ height: "75%" }}
          >
            <Typography variant="caption" textTransform="uppercase">
              No se cargaron expedientes
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
        ) : (
          records.map((record, i) => (
            <Box
              id={`record-${record.id}`}
              key={`${record.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              sx={{
                userSelect: "none",
                backgroundColor:
                  selectedRecord.id === record.id ? colors.primary[300] : "",
                "&:hover": {
                  backgroundColor: colors.primary[300],
                },
              }}
              onClick={() => {
                if (Object.values(contextMenuPosition).length > 0) {
                  setContextMenuPosition({});
                } else {
                  setSelectedRecord(record);
                }
              }}
              onContextMenu={handleContextMenu}
              onBlur={() => setContextMenuPosition({})}
            >
              <Box sx={{ pointerEvents: "none" }}>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {record.order}
                </Typography>
                <Typography fontWeight="600" color={colors.grey[100]}>
                  {record.name}
                </Typography>
              </Box>
              <Box
                sx={{ pointerEvents: "none" }}
                backgroundColor={colors.greenAccent[500]}
                p="7px 7px"
                borderRadius="50%"
              ></Box>
            </Box>
          ))
        )}
        <RecordContextMenu
          position={contextMenuPosition}
          onClickAway={handleClickAway}
        >
          <MenuList dense>
            <MenuItem
              onClick={() => navigate(`/expedientes/${contextMenuObjId}`)}
            >
              <ListItemIcon>
                <FileOpenIcon />
              </ListItemIcon>
              <ListItemText>Abrir</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText>Archivar</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setContextMenuPosition({});
                setModal(true);
              }}
            >
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Eliminar</ListItemText>
            </MenuItem>
          </MenuList>
        </RecordContextMenu>
        <RecordModalDelete
          isOpen={modal}
          handleOnClose={() => setModal(false)}
          recordId={contextMenuObjId}
        />
        <Box
          display="flex"
          justifyContent="center"
          py={1}
          color={colors.grey[500]}
        >
          <Typography fontWeight={700}>·</Typography>
        </Box>
      </Box>
      <Box
        gridColumn={{ xs: "span 12", sm: "span 8" }}
        gridRow={{ xs: "span 2", sm: "span 2" }}
      >
        {Object.values(selectedRecord).length <= 0 ? (
          <>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              columnGap={3}
              px={3}
              sx={{ bgcolor: colors.primary[600], height: "100%" }}
            >
              <SvgIcon color="secondary" sx={{ fontSize: 35 }}>
                <ReplyAllIcon />
              </SvgIcon>
              <Typography
                variant="h5"
                color={colors.grey[500]}
                fontWeight={700}
                textTransform="uppercase"
              >
                SELECCIONA ALGÚN EXPEDIENTE DE LA LISTA
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Box
              display="flex"
              p="0 15px"
              sx={{
                bgcolor: colors.primary[600],
                height: "100%",
                width: "100%",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                columnGap={3}
                rowGap={1.5}
                py={1}
                sx={{
                  height: "inherit",
                  width: "inherit",
                  overflow: "scroll",
                }}
              >
                <Box display="flex" columnGap={1} sx={{ width: "100%", mb: 1 }}>
                  <Tooltip
                    placement="left"
                    title={
                      <Typography
                        variant="caption"
                        fontWeight="bold"
                        textTransform="uppercase"
                      >
                        Cerrar
                      </Typography>
                    }
                  >
                    <IconButton
                      color="neutral"
                      onClick={() => {
                        setSelectedRecord({});
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    placement="right"
                    title={
                      <Typography
                        variant="caption"
                        fontWeight="bold"
                        textTransform="uppercase"
                      >
                        Vista Completa
                      </Typography>
                    }
                  >
                    <Button
                      color="neutral"
                      startIcon={<FileOpenIcon />}
                      onClick={() =>
                        navigate(`/expedientes/${selectedRecord.id}`)
                      }
                    >
                      Abrir
                    </Button>
                  </Tooltip>
                </Box>
                <Box display="flex" columnGap={3}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    gap={1}
                    variant="h3"
                    sx={{
                      color: colors.priorityColors[selectedRecord.priority],
                    }}
                  >
                    <Typography
                      color={colors.grey[500]}
                      variant="caption"
                      fontWeight={600}
                      textTransform="uppercase"
                    >
                      Prioridad:{" "}
                    </Typography>
                    {selectedRecord.priority}
                  </Typography>
                  <Typography
                    display="flex"
                    alignItems="center"
                    gap={1}
                    variant="h3"
                    sx={{
                      color: colors.tracingColors[selectedRecord.tracing],
                    }}
                  >
                    <Typography
                      color={colors.grey[500]}
                      variant="caption"
                      fontWeight={600}
                      textTransform="uppercase"
                    >
                      Estado:{" "}
                    </Typography>
                    {selectedRecord.tracing.replaceAll("_", " ")}
                  </Typography>
                </Box>
                <Typography variant="h1" fontWeight={700}>
                  {selectedRecord.order}
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  textTransform="uppercase"
                  color={colors.grey[500]}
                >
                  {selectedRecord.name}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default HotRecords;
