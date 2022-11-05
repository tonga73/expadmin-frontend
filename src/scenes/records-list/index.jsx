import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";

import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import { selectRecords } from "../../store/slices/records.slice";
import { getRecords } from "../../store/actions/records.actions";

const RecordsList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const records = useSelector(selectRecords);

  console.log(records, "RECO");

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    { field: "order", headerName: "N° EXP", flex: 1 },
    {
      field: "tracing",
      headerName: "Estado",
    },
    {
      field: "priority",
      headerName: "Prioridad",
    },
    {
      field: "archive",
      headerName: "Archivado",
      flex: 1,
    },
    {
      field: "defendant",
      headerName: "Actora",
      flex: 1,
    },
    {
      field: "prosecutor",
      headerName: "Demandado",
      flex: 1,
    },
    {
      field: "insurance",
      headerName: "Seguro",
      flex: 1,
    },
  ];

  useEffect(() => {
    dispatch(getRecords({}));
  }, []);

  return (
    <Box m="20px">
      <Header
        title="LISTADO DE EXPEDIENTES"
        subtitle="Lista filtrable de todos los expedientes."
      />
      <Box
        height="56vw"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column-cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={records}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Box>
  );
};

export default RecordsList;
