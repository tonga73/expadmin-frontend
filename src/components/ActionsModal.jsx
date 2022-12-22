import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

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
      <Box
        display="grid"
        alignItems="center"
        sx={{
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
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
    </Modal>
  );
};

export default ActionsModal;
