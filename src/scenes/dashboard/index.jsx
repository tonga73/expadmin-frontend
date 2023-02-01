import React from "react";

import Header from "../../components/Header";
import RecordsStats from "../../components/RecordsStats";

const Dashboard = () => {
  return (
    <div>
      <Header title="Inicio" subtitle="Tablero general de información" />
      <RecordsStats />
    </div>
  );
};

export default Dashboard;
