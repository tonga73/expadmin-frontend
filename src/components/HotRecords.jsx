import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  MenuList,
  MenuItem,
  Modal,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";

import Spinner from "./Spinner";
import RecordContextMenu from "./RecordContextMenu";
import RecordModalDelete from "./RecordModalDelete";

import {
  selectRecords,
  selectRecord,
  selectRecordsStatus,
  setRecordsStatus,
} from "../store/slices/records.slice";
import { getRecords, getRecord } from "../store/actions/records.actions";

const HotRecords = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [contextMenuPosition, setContextMenuPosition] = useState({});
  const [modal, setModal] = useState(false);

  const recordsStatus = useSelector(selectRecordsStatus);
  const records = useSelector(selectRecords);

  const handleContextMenu = async (e) => {
    console.log(e.target.id.replace("record-", ""), "LA E");
    const recordId = await e.target.id.replace("record-", "");
    dispatch(getRecord(recordId));
    e.preventDefault();
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
      gridColumn="span 4"
      gridRow={{ xs: "span 2", xl: "span 4" }}
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
      {records.map(({ id, order, name }, i) => (
        <Box
          id={`record-${id}`}
          key={`${id}-${i}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          p="15px"
          sx={{
            userSelect: "none",
            "&:hover": {
              backgroundColor: colors.primary[300],
            },
          }}
          onClick={() => {
            if (Object.values(contextMenuPosition).length > 0) {
              setContextMenuPosition({});
            } else {
              navigate(`/expedientes/${id}`);
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
              {order}
            </Typography>
            <Typography fontWeight="600" color={colors.grey[100]}>
              {name}
            </Typography>
          </Box>
          <Box
            sx={{ pointerEvents: "none" }}
            backgroundColor={colors.greenAccent[500]}
            p="7px 7px"
            borderRadius="50%"
          ></Box>
        </Box>
      ))}
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
  );
};

export default HotRecords;
