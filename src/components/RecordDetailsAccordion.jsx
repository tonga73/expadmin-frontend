import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { keyframes } from "@mui/material";
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

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import Person2Icon from "@mui/icons-material/Person2";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import AddRecordPartForm from "./AddRecordPartForm";

import { editRecord } from "../store/actions/records.actions";
import {
  selectRecord,
  selectRecordsStatus,
} from "../store/slices/records.slice";

export default function RecordDetailsAccordion({ title, content, name }) {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);

  const recordsStatus = useSelector(selectRecordsStatus);
  const record = useSelector(selectRecord);

  const initialContent = {
    [name]: content,
  };

  const handleAddItem = (item) => {
    if (name === "prosecutor") {
      initialContent.prosecutor = [...content, item];
    } else if (name === "defendant") {
      initialContent.defendant = [...content, item];
    } else if (name === "insurance") {
      initialContent.insurance = [...content, item];
    }

    // Dispatch the action here
    dispatch(editRecord({ id: record.id, req: initialContent }));
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDeleteItem = (item) => {
    if (name === "prosecutor") {
      initialContent.prosecutor = content.filter((x) => x !== item);
    } else if (name === "defendant") {
      initialContent.defendant = content.filter((x) => x !== item);
    } else if (name === "insurance") {
      initialContent.insurance = content.filter((x) => x !== item);
    }

    // Dispatch the action here
    dispatch(editRecord({ id: record.id, req: initialContent }));
  };

  const pulse = keyframes`
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
`;

  return (
    <Box
      sx={{
        width: "100%",
        pointerEvents: recordsStatus === "editing" ? "none" : "initial",
        opacity: recordsStatus === "editing" ? 0.5 : "initial",
        animation:
          recordsStatus === "editing"
            ? `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`
            : "initial",
      }}
    >
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
              <AddRecordPartForm onAddItem={handleAddItem} name={name} />
              {content.length <= 0 ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  gap={1.5}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p={1.5}
                    sx={{
                      bgcolor: colors.primary[500],
                    }}
                  >
                    <Typography color={colors.grey[500]}>
                      No se encontraron datos.
                    </Typography>
                  </Box>
                </Box>
              ) : (
                content.map((e, index) => (
                  <Box
                    component={ListItem}
                    key={index}
                    display="flex"
                    alignItems="center"
                    columnGap={1}
                    sx={{
                      bgcolor: colors.primary[700],
                      borderTopColor: colors.primary[700],
                      borderTopStyle: "solid",
                      borderTopWidth: "1.5px",
                    }}
                  >
                    <Person2Icon />
                    <ListItemText primary={<Typography>{e}</Typography>} />
                    <Tooltip sx={{ bgcolor: "primary" }} title="Agregar parte">
                      <IconButton
                        onClick={() => handleDeleteItem(e)}
                        size="small"
                      >
                        <PersonRemoveIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ))
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
