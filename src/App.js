import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, Container, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import SidebarNavigation from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import RecordCreateForm from "./scenes/record-create-form";
import RecordsList from "./scenes/records-list";
import Record from "./scenes/record/Record";

import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SidebarNavigation />
          <main className="content">
            <Topbar />
            <Container disableGutters>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/crear-expediente"
                  element={<RecordCreateForm />}
                />
                <Route path="/listado-expedientes" element={<RecordsList />} />
                <Route path="/expedientes/:id" element={<Record />} />

                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </Container>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
