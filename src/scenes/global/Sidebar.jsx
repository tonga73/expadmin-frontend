import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { tokens } from "../../theme"
import { useTheme } from "@mui/material/"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import AccountBoxIcon from "@mui/icons-material/AccountBox"

import routes from "../../app/routes"

import { Logo } from "../../components/Logo"
import { FilterPanel } from "../../components/FilterPanel"
import RecordsList from "../../components/RecordsList"
import RecordFilters from "../../components/RecordFilters"

import { selectUser } from "../../store/slices/users.slice"

const Sidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const { pathname } = useLocation()

  const user = useSelector(selectUser)

  const outletElement = document.getElementById("main-outlet")

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        background: `${
          theme.palette.mode === "dark" ? colors.primary[600] : colors.grey[800]
        }`,
        pt: "25px",
        width: "100%",
        minHeight: "100vh",
        height: outletElement ? `${outletElement.offsetHeight}px` : "100vh",
        zIndex: 99,
      }}
    >
      <Logo />
      {/* SIDEBAR ROUTES */}
      <Box width="100%">
        {routes["MAIN"].map((route, index) => (
          <Box key={index} mt={1}>
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
      {pathname !== "/login" &&
      pathname !== "/user-profile" &&
      user.signedIn ? (
        <>
          <Box width="100%">
            {routes["RECORDS"].map((route, index) => (
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
          <FilterPanel />
          <RecordsList />
        </>
      ) : undefined}
      {pathname === "/user-profile" && user.signedIn ? (
        <Box width="100%">
          <Box px={1.5} mt={1.5}>
            <Typography
              variant="caption"
              color={colors.grey[500]}
              fontWeight={700}
              textTransform="uppercase"
            >
              gestión del usuario
            </Typography>
          </Box>
          <Button
            component={Link}
            to={pathname}
            disableRipple
            size="large"
            variant="text"
            startIcon={<AccountBoxIcon />}
            fullWidth={true}
            sx={{
              justifyContent: "flex-start",
              color:
                pathname === "/user-profile"
                  ? colors.blueAccent[500]
                  : colors.grey[300],
              "&:hover": {
                color: colors.grey[100],
              },
            }}
          >
            Perfil
          </Button>
        </Box>
      ) : undefined}
    </Box>
  )
}

export default Sidebar
