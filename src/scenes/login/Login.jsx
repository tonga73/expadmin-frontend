import React from "react";
import firebase, { signInWithGoogle } from "../../services/firebase";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import GoogleIcon from "@mui/icons-material/Google";

const Login = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isRegistering, setIsRegistering] = React.useState(false);

  const createUser = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((firebaseUser) => {
        console.log("usuario creado:", firebaseUser);
        props.setUser(firebaseUser);
      });
  };

  const login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((firebaseUser) => {
        console.log("sesión iniciada con:", firebaseUser.user);
        props.setUser(firebaseUser);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.emailField.value;
    const password = e.target.passwordField.value;

    if (isRegistering) {
      createUser(email, password);
    }

    if (!isRegistering) {
      login(email, password);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
      width="100%"
      minHeight="75vh"
    >
      <Typography
        variant="h1"
        fontWeight={600}
        textTransform="uppercase"
        sx={{
          color:
            theme.palette.mode === "dark"
              ? colors.primary[100]
              : colors.primary[600],
        }}
      >
        {" "}
        {isRegistering ? "Regístrate" : "Inicia sesión"}
      </Typography>
      <Button
        onClick={signInWithGoogle}
        variant="contained"
        startIcon={<GoogleIcon />}
        sx={{
          p: 3,
          color:
            theme.palette.mode === "dark"
              ? colors.primary[400]
              : colors.primary[700],
          bgcolor:
            theme.palette.mode === "dark"
              ? colors.primary[200]
              : colors.primary[900],
          "&:hover": {
            color:
              theme.palette.mode === "dark"
                ? colors.primary[500]
                : colors.primary[600],
            bgcolor:
              theme.palette.mode === "dark"
                ? colors.primary[100]
                : colors.primary[900],
          },
        }}
      >
        <Typography fontWeight={600} variant="h5">
          Iniciar Sesión con Google
        </Typography>
      </Button>
      {/* <Box
        component="form"
        onSubmit={submitHandler}
        display="flex"
        flexDirection="column"
        gap={1.5}
        p={3}
        sx={{ bgcolor: "background.paper" }}
      >
        <label htmlFor="emailField">
          <Typography variant="h5" textTransform="uppercase">
            {" "}
            email{" "}
          </Typography>
        </label>
        <Box
          component="input"
          type="email"
          id="emailField"
          defaultValue="gastonmm@gmail.com"
        />
        <label htmlFor="passwordField">
          <Typography variant="h5" textTransform="uppercase">
            {" "}
            Contraseña{" "}
          </Typography>
        </label>
        <Box
          component="input"
          type="password"
          id="passwordField"
          defaultValue="123456"
        />
        <button type="submit">
          {isRegistering ? "Regístrate" : "Inicia sesión"}
        </button>
      </Box>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering
          ? "¿Ya tienes cuenta? ¡Inicia sesión"
          : "¿No tienes cuenta? ¡Regístrate gratis!"}
      </button> */}
    </Box>
  );
};

export default Login;
