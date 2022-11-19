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

import RecordsList from "../../components/RecordsList";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const location = useLocation().pathname;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      rowGap={1.5}
      sx={{
        background: `${
          theme.palette.mode === "light"
            ? colors.primary[900]
            : colors.primary[600]
        }`,
        color: "#868dfb",
        color: "#6870fa",
        py: "25px",
        px: 1,
        minWidth: "200px",
        width: "100%",
        maxWidth: "300px",
        minHeight: "100vh",
        maxHeight: "100vh",
        zIndex: 99,
      }}
    >
      {/* SIDEBAR ROUTES */}
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
      {/* SIDEBAR RECORDS LIST */}
      <RecordsList />
    </Box>
  );
};

export default Sidebar;
