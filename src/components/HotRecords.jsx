import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import { tokens } from "../theme";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ReplayIcon from "@mui/icons-material/Replay";

import Spinner from "./Spinner";
import RecordContextMenu from "./RecordContextMenu";
import RecordModalDelete from "./RecordModalDelete";
import RecordMain from "../scenes/record/sections/RecordMain";
import RecordDetails from "../scenes/record/sections/RecordDetails";

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
  const [modal, setModal] = useState(false);

  const recordsStatus = useSelector(selectRecordsStatus);
  const records = useSelector(selectRecords);
  const [selectedRecord, setSelectedRecord] = useState({});

  const handleContextMenu = async (e) => {
    e.preventDefault();
    const recordId = await e.target.id.replace("record-", "");
    dispatch(getRecord(recordId));
    const xPos = e.pageX - 50 + "px";
    const yPos = e.pageY - 50 + "px";

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
      gridAutoRows={dense ? "175px" : "130px"}
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
            <MenuItem disabled={recordsStatus === "loading"}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>Editar</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem disabled={recordsStatus === "loading"}>
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText>Archivar</ListItemText>
            </MenuItem>
            <MenuItem
              disabled={recordsStatus === "loading"}
              onClick={() => {
                setContextMenuPosition({});
                setModal(!modal);
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
          handleOnClose={() => setModal(!modal)}
        />
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
                display="grid"
                rowGap={1}
                pr={3}
                py={1}
                sx={{
                  height: "inherit",
                  width: "inherit",
                  overflow: "scroll",
                }}
              >
                <Box>
                  <RecordMain
                    isDashboard
                    onClose={() => setSelectedRecord({})}
                    record={selectedRecord}
                  />
                </Box>
                <Box>
                  <RecordDetails record={selectedRecord} />
                </Box>
                {/* <Typography variant="h3">{selectedRecord.priority}</Typography>
                <Typography variant="h3">{selectedRecord.tracing}</Typography>
                <Typography variant="h2">{selectedRecord.order}</Typography>
                <Typography variant="h3">{selectedRecord.name}</Typography> */}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default HotRecords;
