import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import { tokens } from "../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileOpenIcon from "@mui/icons-material/FileOpen";

import RecordModalDelete from "./RecordModalDelete";

const RecordContextMenu = ({ contextMenuObjId, position, onClickAway }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const { xPos, yPos } = position;

  return (
    <>
      <ClickAwayListener onClickAway={onClickAway}>
        <Box
          id="hot-records"
          display={Object.values(position).length > 0 ? "inherit" : "none"}
          sx={{
            background: colors.primary[500],
            boxShadow: "0 0 5px 1px #ccc",
            color: colors.grey[100],
            width: 130,
            position: "absolute",
            top: yPos || "inherit",
            left: xPos || "inherit",
            zIndex: 999,
          }}
        >
          <MenuList dense>
            <MenuItem
              onClick={() => navigate(`/expedientes/${contextMenuObjId}`)}
            >
              <ListItemIcon>
                <FileOpenIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography textTransform="uppercase" fontWeight={600}>
                  Abrir
                </Typography>
              </ListItemText>
            </MenuItem>
            <Divider />
            {/* <MenuItem>
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography textTransform="uppercase" fontWeight={600}>
                  Archivar
                </Typography>
              </ListItemText>
            </MenuItem> */}
            <MenuItem
              onClick={() => {
                setModal(true);
              }}
            >
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography textTransform="uppercase" fontWeight={600}>
                  Eliminar
                </Typography>
              </ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </ClickAwayListener>
      <RecordModalDelete
        isOpen={modal}
        handleOnClose={() => setModal(false)}
        recordId={contextMenuObjId}
      />
    </>
  );
};

export default RecordContextMenu;
