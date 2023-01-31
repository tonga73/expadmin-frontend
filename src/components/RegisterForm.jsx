import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Spinner from "./Spinner";

import { selectUsersStatus, selectUser } from "../store/slices/users.slice";
import { confirmUser } from "../store/actions/users.actions";

const RegisterForm = (props) => {
  const dispatch = useDispatch();

  const usersStatus = useSelector(selectUsersStatus);
  const user = useSelector(selectUser);

  const confirmAccount = (localDisplayName) => {
    if (localDisplayName.length > 0) {
      dispatch(confirmUser({ email: user.profile.email, localDisplayName }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const localDisplayName = e.target.displayNameField.value;

    confirmAccount(localDisplayName);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      {usersStatus === "verifiying" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          rowGap={3}
        >
          <Spinner size="55" />
          <Typography variant="h3">Confirmando cuenta...</Typography>
          <Typography variant="h6" color="secondary" textTransform="uppercase">
            Aguarde unos instantes
          </Typography>
        </Box>
      ) : (
        <>
          <Typography
            variant="h6"
            color="secondary"
            textTransform="uppercase"
            textAlign="center"
            sx={{
              maxWidth: "350px",
            }}
          >
            confirmá tu cuenta para poder iniciar sesión y acceder al sistema
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            display="flex"
            flexDirection="column"
            gap={1.5}
            p={3}
            width="500px"
            sx={{ bgcolor: "background.paper" }}
          >
            <label htmlFor="displayNameField">
              <Typography
                variant="h5"
                textTransform="uppercase"
                fontWeight={200}
              >
                elegí un nombre para mostrar
              </Typography>
            </label>
            <TextField type="text" id="displayNameField" />
            <Box display="flex" justifyContent="space-around">
              <Button onClick={props.cancelRegistration} color="neutral">
                cancelar
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                confirmar cuenta
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RegisterForm;
