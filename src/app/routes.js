import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TableChartIcon from "@mui/icons-material/TableChart";

const routes = {
  MAIN: [
    {
      label: "Inicio",
      path: "/",
      icon: <HomeOutlinedIcon />,
    },
  ],
  RECORDS: [
    {
      label: "Crear Expediente",
      path: "/crear-expediente",
      icon: <AddBoxIcon />,
      sectionHeader: "Gestión de Expedientes",
    },
    {
      label: "Vista de tabla",
      path: "/listado-expedientes",
      icon: <TableChartIcon />,
    },
  ],
  // {
  //   label: "Vista Avanzada",
  //   path: "/invoices",
  //   icon: <ReceiptOutlinedIcon />,
  // },
  //   {
  //     label: "Manage Team",
  //     path: "/team",
  //     icon: <PeopleOutlinedIcon />,
  //     sectionHeader: "Expedientes",
  //   },
  //   {
  //     label: "Contacts",
  //     path: "/contacts",
  //     icon: <ContactsOutlinedIcon />,
  //   },
  //   {
  //     label: "Invoices",
  //     path: "/invoices",
  //     icon: <ReceiptOutlinedIcon />,
  //   },
  //   {
  //     label: "Profile Form",
  //     path: "/form",
  //     icon: <PersonOutlinedIcon />,
  //     sectionHeader: "Pages",
  //   },
  //   {
  //     label: "Calendar Information",
  //     path: "/calendar",
  //     icon: <CalendarTodayOutlinedIcon />,
  //   },
  //   {
  //     label: "FAQ Page",
  //     path: "/faq",
  //     icon: <HelpOutlinedIcon />,
  //   },
  //   {
  //     label: "Bar",
  //     path: "/bar",
  //     icon: <BarChartOutlinedIcon />,
  //     sectionHeader: "Charts",
  //   },
  //   {
  //     label: "Pie",
  //     path: "/pie",
  //     icon: <PieChartOutlinedIcon />,
  //   },
  //   {
  //     label: "Line",
  //     path: "/line",
  //     icon: <TimelineOutlinedIcon />,
  //   },
  //   {
  //     label: "Geography",
  //     path: "/geography",
  //     icon: <MapOutlinedIcon />,
  //   },
};
export default routes;
