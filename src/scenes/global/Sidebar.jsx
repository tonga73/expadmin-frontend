import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";

import routes from "../../app/routes";

const Sidebar = () => {
  const isNonTablet = useMediaQuery("(min-width: 961px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(isNonTablet ? true : true);

  const location = useLocation().pathname;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        position: isCollapsed ? "inherit" : "absolute",
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
        zIndex: 99,
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        {isCollapsed ? null : (
          <Typography variant="h4" color={colors.grey[100]}>
            ADMINISTRACION
          </Typography>
        )}
        <IconButton
          size="large"
          onClick={() => setIsCollapsed(!isCollapsed)}
          type="button"
        >
          <MenuOutlinedIcon />
        </IconButton>
      </Box>
      {isCollapsed ? (
        routes.map((route, index) => {
          return (
            <Tooltip
              key={index}
              placement="left"
              title={
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  {route.label}
                </Typography>
              }
            >
              <IconButton
                component={Link}
                to={route.path}
                disableRipple
                size="large"
                sx={{
                  mt: 1,
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
                {route.icon}
              </IconButton>
            </Tooltip>
          );
        })
      ) : (
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
      )}
    </Box>
  );
};

export default Sidebar;
