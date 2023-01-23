import React from "react";
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

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, minmax(0, 1fr))"
          className="app"
        >
          <Box gridColumn="span 2">
            <SidebarNavigation />
          </Box>
          <Box gridColumn="span 10">
            <main className="content">
              <Topbar />
              <Container>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/crear-expediente"
                    element={<RecordCreateForm />}
                  />
                  <Route
                    path="/listado-expedientes"
                    element={<RecordsList />}
                  />
                  <Route path="/expedientes/:id" element={<Record />} />
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
