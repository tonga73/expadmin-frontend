import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
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

  const dataRecords = records.map(
    (el) => el.tracing && { ...el, tracing: el.tracing.replaceAll("_", " ") }
  );

  const columns = [
    { field: "order", headerName: "N° EXP", flex: 1 },
    {
      field: "name",
      headerName: "Carátula del Expediente",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "tracing",
      headerName: "Estado",
      flex: 2,
    },
    {
      field: "priority",
      headerName: "Prioridad",
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

  // useEffect(() => {
  //   dispatch(getRecords({}));
  // }, []);

  return (
    <Box>
      <Header
        title="LISTADO DE EXPEDIENTES"
        subtitle="Lista filtrable de todos los expedientes."
      />
      <Box
        height="69vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor:
              theme.palette.mode === "dark"
                ? colors.blueAccent[900]
                : colors.blueAccent[600],
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column-cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? colors.blueAccent[800]
                : colors.blueAccent[500],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? colors.primary[400]
                : colors.primary[900],
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
          loading
          columns={columns}
          rows={dataRecords}
          components={{ LoadingOverlay: LinearProgress, Toolbar: GridToolbar }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Box>
  );
};

export default RecordsList;
