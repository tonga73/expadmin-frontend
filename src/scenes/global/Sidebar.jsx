import { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import routes from "../../app/routes";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const location = useLocation().pathname;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        background: `${
          theme.palette.mode === "light"
            ? colors.primary[900]
            : colors.primary[600]
        }`,
        color: "#868dfb",
        color: "#6870fa",
        p: "25px",
        minWidth: isCollapsed ? "0px" : "200px",
        width: "100%",
        maxWidth: isCollapsed ? "0px" : "235px",
        minHeight: "100vh",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        {isCollapsed ? null : (
          <Typography variant="h4" color={colors.grey[100]}>
            ADMINISTRACION
          </Typography>
        )}
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)} type="button">
          <MenuOutlinedIcon />
        </IconButton>
      </Box>
      <Box width="100%">
        {routes.map((route, index) => (
          <Box key={index}>
            {route.sectionHeader ? (
              <Box mt={1.5}>
                <Typography
                  variant="caption"
                  color={colors.grey[500]}
                  fontWeight={700}
                  textTransform="uppercase"
                >
                  {route.sectionHeader}
                </Typography>
              </Box>
            ) : null}
            <Button
              component={Link}
              to={route.path}
              disableRipple
              size="large"
              variant="text"
              startIcon={route.icon}
              fullWidth={true}
              sx={{
                justifyContent: "flex-start",
                color:
                  location === route.path
                    ? colors.blueAccent[500]
                    : colors.grey[300],
                "&:hover": {
                  color: colors.grey[100],
                },
              }}
            >
              {route.label}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
