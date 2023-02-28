import { useSearchParams } from "react-router-dom"
import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme"
import ProgressCircle from "./ProgressCircle"

import { pulse } from "../utils/keyframes"

const StatBox = ({
  title,
  titleFontVariant,
  subtitle,
  icon,
  progress,
  progressSize,
  type,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [searchParams, setSearchParams] = useSearchParams()

  function handleClick(e) {
    if (subtitle === "Destacado") {
      searchParams.set(type, "desc")
    } else {
      searchParams.set(type, subtitle.replaceAll(" ", "_").toUpperCase())
    }
    setSearchParams(searchParams)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      width="100%"
      minHeight="min-content"
      sx={{
        bgcolor:
          theme.palette.mode === "dark"
            ? colors.primary[600]
            : colors.grey[800],
        userSelect: "none",
        py: "3%",
        "&:hover": {
          bgcolor: !!type
            ? theme.palette.mode === "dark"
              ? colors.primary[700]
              : colors.grey[700]
            : undefined,
        },
      }}
      onClick={!!type ? handleClick : undefined}
    >
      <Box display="flex" justifyContent="center" height="100%">
        <Box
          display="grid"
          gridAutoFlow={{ xs: "column", sm: "row" }}
          gridTemplateRows={{
            xs: "1fr",
            sm: "min-content 1fr min-content",
          }}
          justifyContent="center"
          alignItems="center"
          gap={1}
          sx={{
            px: 3,
            py: "3%",
          }}
        >
          <Box mx="auto">
            <ProgressCircle
              size={progressSize ? progressSize : 50}
              progress={progress}
              icon={icon}
            />
          </Box>
          <Box sx={{ color: colors.grey[100] }}>
            <Typography
              variant={titleFontVariant ? titleFontVariant : "h5"}
              fontWeight={300}
              textTransform="uppercase"
              textAlign="center"
            >
              {subtitle.length <= 0 ? "-" : subtitle}
            </Typography>
          </Box>
          <Box sx={{ color: colors.grey[100] }}>
            <Typography
              variant={titleFontVariant ? titleFontVariant : "h3"}
              fontWeight="bold"
              textAlign="center"
            >
              {title === null ? (
                <Box sx={{ animation: `${pulse} 2s linear infinite` }}>-</Box>
              ) : (
                title
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StatBox
