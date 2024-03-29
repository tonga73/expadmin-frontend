import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  useTheme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { tokens } from "../theme";

function NotificationsPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const initialNotifications = useMemo(
    () => [
      {
        id: "1",
        title: "EXPEDIENTES: Destacar para control",
        text: "Los expedientes ahora cuentan con una opción para destacarlos. El ícono es visible desde la lista pero su estado solamente puede ser modificado ingresando al expediente.",
        isRead: false,
      },
    ],
    []
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAsRead = (notification) => {
    // marca la notificación como leída
    notification.isRead = true;
    // actualiza el arreglo de notificaciones y lo guarda en el local storage
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? notification : n
    );
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    setNotifications(JSON.parse(localStorage.getItem("notifications")));
    // handleClose();
  };

  useEffect(() => {
    if (localStorage.getItem("notifications") <= 0) {
      localStorage.setItem(
        "notifications",
        JSON.stringify(initialNotifications)
      );
    } else if (
      localStorage.getItem("notifications") !== JSON.stringify(notifications)
    ) {
      setNotifications(JSON.parse(localStorage.getItem("notifications")));
    }
  }, [notifications, initialNotifications]);

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("notifications")) !== initialNotifications
    ) {
      localStorage.setItem(
        "notifications",
        JSON.stringify(initialNotifications)
      );
    }
  }, [notifications, initialNotifications]);

  return (
    <Box>
      <IconButton
        size="medium"
        aria-label="notifications"
        aria-controls="notifications-popover"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <Badge
          badgeContent={notifications.filter((e) => e.isRead === false).length}
          color="error"
        >
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>
      <Popover
        id="notifications-popover"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List
          sx={{
            bgcolor: colors.primary[500],
            maxWidth: "470px",
          }}
        >
          {notifications.length <= 0 ? (
            <Box px={3} py={1}>
              <Typography
                textTransform="uppercase"
                fontWeight="bold"
                sx={{ opacity: 0.5 }}
              >
                NO HAY NOTIFICACIONES
              </Typography>
            </Box>
          ) : (
            notifications.map((notification) => (
              <Box
                component={ListItem}
                key={notification.id}
                display="flex"
                gap={1}
              >
                <ListItemButton
                  disabled={notification.isRead}
                  onClick={() => markAsRead(notification)}
                >
                  <IconButton>
                    <SvgIcon
                      component={GppMaybeIcon}
                      color={notification.isRead ? "neutral" : "warning"}
                      inheritViewBox
                    />
                  </IconButton>
                  <ListItemText
                    primary={notification.title}
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      variant: "subtitle1",
                    }}
                    secondary={notification.text}
                    secondaryTypographyProps={{
                      fontStyle: "italic",
                      variant: "subtitle2",
                    }}
                  />
                </ListItemButton>
              </Box>
            ))
          )}
        </List>
      </Popover>
    </Box>
  );
}

export default NotificationsPopover;
