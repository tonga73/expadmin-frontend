import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableRowsIcon from "@mui/icons-material/TableRows";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

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
