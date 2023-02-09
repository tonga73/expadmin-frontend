import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { ColorModeContext, useMode, tokens } from "./theme";
import { CssBaseline, Container, ThemeProvider } from "@mui/material";

import Box from "@mui/material/Box";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import RecordCreateForm from "./scenes/record-create-form";
import RecordsTable from "./scenes/records-table";
import Record from "./scenes/record";
import UserProfile from "./scenes/user-profile";

import Login from "./scenes/login/Login";
import { ProtectedRoute } from "./utils/routeGuard";

import { setUserCondition, selectUser } from "./store/slices/users.slice";

function App() {
  // THEME UTILS
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(
    JSON.parse(localStorage.getItem("sidebar")) || false
  );

  const user = useSelector(selectUser);

  const validatedRedirect = () => {
    console.log("SIPE");
    dispatch(setUserCondition(""));
    navigate("/");
  };

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    localStorage.setItem("sidebar", sidebarOpen);
    localStorage.setItem("theme", theme.palette.mode);
  }, [sidebarOpen, theme.palette.mode]);

  useEffect(() => {
    if (location.pathname !== "/login" && user.condition === "validated") {
      dispatch(setUserCondition(""));
      navigate("/", { replace: true });
      setSidebarOpen(true);
    }
    if (
      location.pathname === "/login" &&
      user.condition !== "verified" &&
      user.signedIn
    ) {
      navigate("/", { replace: true });
    }
    if (location.pathname === "/login") {
      setSidebarOpen(false);
    }
  }, [user.signedIn, user.condition, location.pathname, dispatch, navigate]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          display="grid"
          gridTemplateColumns={`${sidebarOpen ? "30%" : ""} ${
            sidebarOpen ? "70%" : "1fr"
          }`}
          className="app"
          sx={{
            "*::-webkit-scrollbar": {
              width: "7px",
            },
            "*::-webkit-scrollbar-track": {
              background:
                theme.palette.mode === "dark"
                  ? colors.primary[600]
                  : colors.grey[800],
            },
            "*::-webkit-scrollbar-thumb": {
              background:
                theme.palette.mode === "dark"
                  ? colors.primary[400]
                  : colors.grey[600],
            },
            "*::-webkit-scrollbar-track:hover": {
              background:
                theme.palette.mode === "dark"
                  ? colors.primary[700]
                  : colors.grey[700],
            },
          }}
        >
          <Box display={sidebarOpen ? "initial" : "none"}>
            <Sidebar />
          </Box>

          <Box width="100%">
            <main id="main-outlet" className="content">
              <Topbar
                user={user}
                sidebarOpen={sidebarOpen}
                handleSidebar={handleSidebar}
              />
              <Container>
                <Routes>
                  <Route path="*" element={<Navigate to="/" replace />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute isSignedIn={user.signedIn}>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/crear-expediente"
                    element={
                      <ProtectedRoute isSignedIn={user.signedIn}>
                        <RecordCreateForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/listado-expedientes"
                    element={
                      <ProtectedRoute isSignedIn={user.signedIn}>
                        <RecordsTable />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/expedientes/:id"
                    element={
                      <ProtectedRoute isSignedIn={user.signedIn}>
                        <Record />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-profile"
                    element={
                      <ProtectedRoute isSignedIn={user.signedIn}>
                        <UserProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </Container>
            </main>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
