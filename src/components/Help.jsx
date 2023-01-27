import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material";
import { tokens } from "../theme";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Help = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <IconButton
        onClick={handleOpen}
        size="medium"
        aria-label="notifications"
        aria-controls="notifications-popover"
        aria-haspopup="true"
        color="inherit"
      >
        <InfoOutlinedIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxWidth="50vw"
          height="100%"
          maxHeight="50vh"
          gap={1}
          p={5}
          m="auto"
          sx={{ bgcolor: colors.primary[600], textAlign: "center" }}
        >
          <Typography variant="h3" fontWeight={700} letterSpacing={1.3}>
            HUGADMIN
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={0.5}
            width="100%"
          >
            <Typography variant="subtitle1" fontWeight={100}>
              Versión
            </Typography>
            <Typography variant="subtitle2">
              {require("../../package.json").version}
            </Typography>
            <Typography variant="subtitle1" fontWeight={100}>
              para navegadores.
            </Typography>
          </Box>
          <Typography
            variant="subtitle2"
            fontWeight={500}
            color={colors.grey[500]}
            sx={{ maxWidth: "300px" }}
          >
            Sistema digital para la gestión de expedientes.
          </Typography>
          <Button
            component={Link}
            href="https://tonga73.github.io"
            target="_blank"
            variant="text"
            size="small"
            sx={{ color: colors.greenAccent[500], textTransform: "lowercase" }}
          >
            gastoire
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Help;
