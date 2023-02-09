import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";

import ActionsModal from "../../components/ActionsModal";

import { selectUser, setUsersStatus } from "../../store/slices/users.slice";
import { selectUsersStatus } from "../../store/slices/users.slice";

import { editUserName } from "../../store/actions/users.actions";

const UserProfile = () => {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const { profile } = useSelector(selectUser) || {};
  const usersStatus = useSelector(selectUsersStatus);

  const initialValues = {
    name: profile.name || "",
  };

  const userSchema = yup.object().shape({
    name: yup.string(),
  });

  const handleOnClose = () => {
    setEditMode(false);
  };

  const handleEditProfileName = ({ name }) => {
    dispatch(editUserName({ email: profile.email, req: { name: name } }));
  };

  useEffect(() => {
    if (usersStatus === "edited") {
      handleOnClose();
      dispatch(setUsersStatus(""));
    }
  }, [usersStatus, dispatch]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1.5}
      py={3}
    >
      <Avatar
        alt={profile.name}
        src={profile.photoURL || undefined}
        sx={{
          height: 120,
          width: 120,
          border: `3px solid ${colors.greenAccent[500]}`,
        }}
      />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          gap={1.5}
        >
          <Typography variant="h3" textTransform="uppercase">
            {profile.name}
          </Typography>
          <Button
            color="warning"
            variant="outlined"
            size="small"
            onClick={() => setEditMode(true)}
          >
            Editar
          </Button>
        </Box>
        <Typography
          variant="subtitle1"
          textTransform="uppercase"
          color={colors.grey[500]}
        >
          {profile.role}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={1.5}
        p={3}
        sx={{ border: `1px solid ${colors.grey[500]}` }}
      >
        <Alert>
          <Typography
            variant="caption"
            fontWeight={300}
            letterSpacing={1.3}
            textTransform="uppercase"
            textAlign="center"
            color={colors.grey[300]}
          >
            cuenta vinculada con GOOGLE
          </Typography>
        </Alert>
        <Box>
          <Typography
            variant="caption"
            fontWeight={100}
            letterSpacing={1.3}
            textTransform="uppercase"
          >
            nombre
          </Typography>
          <Typography variant="h4" fontWeight={300} color={colors.grey[300]}>
            {profile.displayName}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="caption"
            fontWeight={100}
            letterSpacing={1.3}
            textTransform="uppercase"
          >
            correo electrónico
          </Typography>
          <Typography variant="h4" fontWeight={300} color={colors.grey[300]}>
            {profile.email}
          </Typography>
        </Box>
      </Box>
      <ActionsModal
        isLoading={usersStatus === "editing"}
        isOpen={editMode}
        handleOnClose={handleOnClose}
      >
        <Formik
          onSubmit={handleEditProfileName}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Box
              display="flex"
              flexDirection="column"
              gap={1.5}
              pb={1.5}
              component="form"
              action=""
              onSubmit={handleSubmit}
            >
              <TextField
                placeholder="EJ: Martinez c/ Empresa Explotadora, ..."
                color="warning"
                fullWidth
                type="text"
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              {/* MODAL ACTIONS */}
              <Box
                display="flex"
                justifyContent="space-around"
                gap={5}
                width="100%"
              >
                <Button
                  fullWidth
                  color="neutral"
                  variant="contained"
                  size="large"
                  onClick={handleOnClose}
                >
                  Cerrar
                </Button>
                <Button
                  fullWidth
                  color="secondary"
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                >
                  Guardar Cambios
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </ActionsModal>
    </Box>
  );
};

export default UserProfile;
