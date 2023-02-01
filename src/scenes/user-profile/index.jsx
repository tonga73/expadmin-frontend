import React from "react";
import { useSelector } from "react-redux";

import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import { selectUser } from "../../store/slices/users.slice";

const UserProfile = () => {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { profile } = useSelector(selectUser);

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
        <Typography variant="h3" textTransform="uppercase">
          {profile.name}
        </Typography>
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
    </Box>
  );
};

export default UserProfile;
