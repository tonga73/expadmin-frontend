import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({
  title,
  subtitle,
  icon,
  progress,
  progressSize,
  dense,
  titleFontVariant,
  subtitleFontVariant,
  type,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [searchParams, setSearchParams] = useSearchParams();
  function truncate(string, limit) {
    if (string.length <= limit) {
      return string;
    }

    return string.slice(0, limit) + "...";
  }

  function handleClick(e) {
    e.stopPropagation();
    searchParams.set(type, subtitle.replaceAll(" ", "_").toUpperCase());
    setSearchParams(searchParams);
  }

  return dense ? (
    <Box width="100%" sx={{ userSelect: "none" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={0.5}
      >
        {icon}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {title}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" sx={{ color: colors.greenAccent[100] }}>
            {truncate(subtitle, 9)}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle size="25" progress={progress} />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      width="100%"
      p="15px 30px"
      sx={{
        userSelect: "none",
        "&:hover": {
          opacity: 0.9,
        },
      }}
      onClick={type !== "" ? handleClick : undefined}
    >
      <Box
        display="grid"
        height="100%"
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <ProgressCircle size={progressSize} progress={progress} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          px={1}
          justifyContent="center"
        >
          {icon}
          <Typography
            variant={titleFontVariant}
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
          <Typography
            variant={subtitleFontVariant}
            sx={{ color: colors.greenAccent[100] }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
