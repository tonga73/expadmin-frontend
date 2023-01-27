import { useNavigate, useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import NotificationsPopover from "../../components/NotificationsPopover";
import LogoutButton from "../../components/LogoutButton";
import Spinner from "../../components/Spinner";

const Topbar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  console.log(require("../../../package.json").version);

  const handleUserProfile = () => {
    navigate("/user-profile");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" gap={1} borderRadius="3px">
        {props.user.signedIn ? (
          <>
            <IconButton
              onClick={props.handleSidebar}
              size="medium"
              sx={{
                transform: props.sidebarOpen ? "" : "rotate(180deg)",
                animation: "transform 500ms ease",
              }}
            >
              <MenuOpenIcon />
            </IconButton>
            <Box alignItems="center">
              {pathname === "/user-profile" ? undefined : (
                <Tooltip
                  title={
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      perfil de usuario
                    </Typography>
                  }
                >
                  <Box
                    onClick={handleUserProfile}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{
                      userSelect: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      alt={props.user.profile.name}
                      src={props.user.profile.photoURL || undefined}
                    />
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <Typography variant="h4" color={colors.grey[500]}>
                        {props.user.profile.name}
                      </Typography>
                    </Box>
                  </Box>
                </Tooltip>
              )}
            </Box>
          </>
        ) : undefined}
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
      </Box>

      {/* ICONS */}
      <Box display="flex" gap={0.5}>
        <Box display="flex" alignItems="center">
          <Typography variant="caption" color={colors.grey[500]}>
            v{require("../../../package.json").version}
          </Typography>
        </Box>
        <IconButton size="medium" onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <NotificationsPopover />
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}

        {props.user.signedIn ? <LogoutButton /> : undefined}
      </Box>
    </Box>
  );
};

export default Topbar;
