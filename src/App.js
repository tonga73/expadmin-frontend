import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, Container, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import SidebarNavigation from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import RecordCreateForm from "./scenes/record-create-form";
import RecordsList from "./scenes/records-list";
import Record from "./scenes/record";

import Login from "./scenes/login/Login";
import { ProtectedRoute } from "./utils/routeGuard";

import firebase from "./services/firebase";

import {
  setSignedIn,
  setUserProfile,
  selectUser,
  selectSignedIn,
} from "./store/slices/users.slice";

import { logIn } from "./store/actions/users.actions";

function App() {
  const dispatch = useDispatch();
  const [theme, colorMode] = useMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.condition !== "verified") {
      firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          const { accessToken, email } = firebaseUser.multiFactor.user;
          dispatch(logIn(email));
          localStorage.setItem("token", accessToken);
          localStorage.setItem("signedIn", true);
        }
      });
    }
  }, [user["condition"]]);

  useEffect(() => {
    if (user.condition !== "verified" && user.signedIn) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [user.signedIn, user.condition]);

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
        >
          <Box display={sidebarOpen ? "initial" : "none"}>
            <SidebarNavigation />
          </Box>

          <Box width="100%">
            <main className="content">
              <Topbar user={user} />
              <Container>
                <Routes>
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
                        <RecordsList />
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
