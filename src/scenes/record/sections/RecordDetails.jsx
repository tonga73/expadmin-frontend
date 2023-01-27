import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PlaceIcon from "@mui/icons-material/Place";
import GavelIcon from "@mui/icons-material/Gavel";

import RecordDetailsAccordion from "../../../components/RecordDetailsAccordion";

const RecordDetails = ({ record }) => {
  // THEME UTILS
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="grid" gap={1}>
      <Paper>
        {record.office ? (
          <>
            <Box
              display="grid"
              alignItems="center"
              rowGap={0.5}
              sx={{ p: 1, height: "100%" }}
            >
              <Box display="flex" alignItems="center" columnGap={1}>
                <SvgIcon sx={{ fontSize: 35 }}>
                  <AccountBalanceIcon />
                </SvgIcon>
                <Box>
                  <Typography
                    variant="overflow"
                    textTransform="uppercase"
                    fontStyle="italic"
                    color={colors.grey[500]}
                  >
                    {record.office.court.district.name} CIRCUNSCIPCIÓN
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {record.office.court.name}
                  </Typography>
                  <Typography variant="caption" textTransform="uppercase">
                    SECRETARÍA {record.office.name}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" columnGap={0.5}>
                <SvgIcon sx={{ fontSize: 15 }}>
                  <PlaceIcon />
                </SvgIcon>
                <Box display="flex" alignItems="center" columnGap={0.5}>
                  <Typography variant="body1" fontWeight={700}>
                    {record.office.court.city}
                  </Typography>
                  ·
                  <Typography
                    variant="caption"
                    fontWeight={500}
                    fontStyle="italic"
                  >
                    {record.office.court.address}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" columnGap={0.5}>
                <SvgIcon sx={{ fontSize: 15 }}>
                  <GavelIcon />
                </SvgIcon>
                <Typography variant="body1" fontWeight={600}>
                  {record.office.court.judge}
                </Typography>
              </Box>
            </Box>
          </>
        ) : undefined}
      </Paper>
      <Box display="grid" rowGap={1} sx={{ width: "100%" }}>
        <RecordDetailsAccordion
          title="Parte Actora"
          content={record.prosecutor || []}
          name="prosecutor"
        />
        <RecordDetailsAccordion
          title="Parte Demandada"
          content={record.defendant || []}
          name="defendant"
        />
        <RecordDetailsAccordion
          title="Seguro"
          content={record.insurance || []}
          name="insurance"
        />
      </Box>
    </Box>
  );
};

export default RecordDetails;
