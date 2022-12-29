import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";

import Spinner from "./Spinner";

const ActionsModal = ({
  children,
  isLoading,
  isOpen,
  handleIsOpen,
  handleOnClose,
  handleSubmit,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleOnClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: 630,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 1.5,
            mb: 0.3,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
              textTransform="uppercase"
              textAlign="center"
            >
              Editando Expediente
            </Typography>
          </Box>
          <IconButton onClick={handleOnClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          display="grid"
          alignItems="center"
          sx={{
            width: 630,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              rowGap={3}
            >
              <Spinner size="55" />
              <Typography variant="h3">Cargando...</Typography>
              <Typography
                variant="h6"
                color="secondary"
                textTransform="uppercase"
              >
                Aguarde unos instantes
              </Typography>
            </Box>
          ) : (
            children
          )}
        </Box>
      </>
    </Modal>
  );
};

export default ActionsModal;
