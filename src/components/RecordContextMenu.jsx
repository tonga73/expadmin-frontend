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

const RecordContextMenu = ({ children, position, onClickAway }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { xPos, yPos } = position;
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Box
        id="hot-records"
        display={Object.values(position).length > 0 ? "inherit" : "none"}
        sx={{
          background: colors.primary[500],
          width: 130,
          position: "absolute",
          top: yPos || "inherit",
          left: xPos || "inherit",
          zIndex: 999,
        }}
      >
        {children}
      </Box>
    </ClickAwayListener>
  );
};

export default RecordContextMenu;
