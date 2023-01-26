import { useState } from "react";
import { useSelector } from "react-redux";
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

import { gradient } from "../../utils/keyframes";

import RecordsList from "../../components/RecordsList";
import RecordFilters from "../../components/RecordFilters";

import { selectUser } from "../../store/slices/users.slice";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { pathname } = useLocation();
  const user = useSelector(selectUser);

  const styles = {
    text: {
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      background: `linear-gradient(to right, ${colors.greenAccent[500]}, ${colors.blueAccent[500]})`,
      backgroundClip: "text",
      color: "transparent",
      animation: `${gradient} 1s linear infinite`,
    },
  };
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
        width: "100%",
        minHeight: "100%",
        maxHeight: "100vh",
        zIndex: 99,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1.5}
        sx={{ pointerEvents: "none", userSelect: "none" }}
      >
        <Box
          component="img"
          src="../images/hugadminFavicon.png"
          alt="Imagen Logo de Hugadmin."
          height="55px"
          sx={{ boxShadow: 21 }}
        />
        <Typography
          variant="h2"
          textTransform="uppercase"
          fontWeight={100}
          sx={styles.text}
          className="text"
        >
          Hugadmin
        </Typography>
      </Box>
      {/* SIDEBAR ROUTES */}
      <Box width="100%">
        {routes.map((route, index) => (
          <Box key={index}>
            {route.sectionHeader ? (
              <Box mt={1.5} px={1.5}>
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
                  pathname === route.path
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
      {pathname !== "/login" && user.signedIn ? (
        <>
          <RecordFilters />
          <RecordsList />
        </>
      ) : undefined}
    </Box>
  );
};

export default Sidebar;
