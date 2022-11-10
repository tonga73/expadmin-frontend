import * as React from "react";

import { useTheme } from "@mui/material";
import { tokens } from "../theme";

import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";

export default function RecordDetailsAccordion({ title, content }) {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [expanded, setExpanded] = React.useState(false);

  console.log(content);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box gridColumn="span 12">
        <Accordion expanded={expanded === title} onChange={handleChange(title)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${title.replaceAll(" ", "")}bh-content`}
            id={`${title.replaceAll(" ", "")}bh-header`}
            sx={{ minHeight: "16px !important", height: "32px" }}
          >
            <Typography fontWeight={600} sx={{ width: "100%" }}>
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: colors.primary[600] }}>
            <List
              dense
              sx={{
                width: "100%",
                p: 0,
              }}
            >
              {content.length <= 0 ? (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography color={colors.grey[500]}>
                    No se encontraron datos.
                  </Typography>
                  <Tooltip sx={{ bgcolor: "primary" }} title="Agregar parte">
                    <IconButton size="small">
                      <PersonAddIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                content.map((e, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText primary={<Typography>{e}</Typography>} />
                    <Tooltip sx={{ bgcolor: "primary" }} title="Agregar parte">
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                ))
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
