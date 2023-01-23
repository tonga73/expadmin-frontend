import React from "react";
import { app } from "../../data/firebaseKeys";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Login = (props) => {
  const [isRegistering, setIsRegistering] = React.useState(false);

  const crearUsuario = (email, password) => {
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((firebaseUser) => {
        console.log("usuario creado:", firebaseUser);
        props.setUser(firebaseUser);
      });
  };

  const iniciarSesion = (email, password) => {
    app
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
      crearUsuario(email, password);
    }

    if (!isRegistering) {
      iniciarSesion(email, password);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h1" fontWeight={600}>
        {" "}
        {isRegistering ? "Regístrate" : "Inicia sesión"}
      </Typography>
      <Box
        component="form"
        onSubmit={submitHandler}
        display="flex"
        flexDirection="column"
        gap={1.5}
        maxWidth="min-content"
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
      </button>
    </Box>
  );
};

export default Login;
