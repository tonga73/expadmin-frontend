import * as React from "react"
import { useSearchParams } from "react-router-dom"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Fab from "@mui/material/Fab"
import Typography from "@mui/material/Typography"
import { useTheme, alpha } from "@mui/material"
import { tokens } from "../theme"

import { pulse } from "../utils/keyframes"

export default function StatBox(props) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [searchParams, setSearchParams] = useSearchParams()

  function handleClick(e) {
    if (props.subtitle === "Destacado") {
      searchParams.set(props.type, "desc")
    } else {
      searchParams.set(
        props.type,
        props.subtitle.replaceAll(" ", "_").toUpperCase()
      )
    }
    setSearchParams(searchParams)
  }

  const colorSelector = (value) => {
    switch (value) {
      case null:
        return colors.blueAccent[500]
      case "priority":
        return colors.priorityColors[
          props.subtitle.replaceAll(" ", "_").toUpperCase()
        ]
      case "tracing":
        return colors.tracingColors[
          props.subtitle.replaceAll(" ", "_").toUpperCase()
        ]
      case "favorite":
        return colors.greenAccent[500]

      default:
        break
    }
  }

  return (
    <Box
      display="grid"
      gridAutoFlow={{ xs: "column", sm: "row" }}
      gridTemplateRows={{
        xs: "1fr",
        sm: "min-content 1fr 1fr",
      }}
      gap={1}
      onClick={!!props.type ? handleClick : undefined}
      sx={{
        py: "7%",
        placeItems: "center",
        border:
          searchParams.get(props.type) ===
          props.subtitle.replaceAll(" ", "_").toUpperCase()
            ? `3px solid ${colorSelector(props.type)}`
            : searchParams.has("favorite") && props.type === "favorite"
            ? `3px solid ${colorSelector(props.type)}`
            : `3px solid transparent`,
        bgcolor:
          searchParams.get(props.type) ===
          props.subtitle.replaceAll(" ", "_").toUpperCase()
            ? alpha(colorSelector(props.type), 0.07)
            : theme.palette.mode === "dark"
            ? colors.primary[600]
            : colors.grey[800],
        userSelect: "none",
        "&:hover": {
          bgcolor:
            searchParams.get(props.type) !==
            props.subtitle.replaceAll(" ", "_").toUpperCase()
              ? !!props.type
                ? theme.palette.mode === "dark"
                  ? colors.primary[700]
                  : colors.grey[700]
                : undefined
              : null,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Fab
          aria-label="save"
          disableRipple
          disableFocusRipple
          sx={{
            backgroundColor: "transparent",
            cursor: "default",
            "&:hover": { bgcolor: "transparent" },
          }}
        >
          {props.icon}
        </Fab>
        <CircularProgress
          value={props.progress}
          variant="determinate"
          size={68}
          sx={{
            color: colorSelector(props.type),
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      </Box>
      <Typography
        variant={props.titleFontVariant ? props.titleFontVariant : "h5"}
        fontWeight={300}
        textTransform="uppercase"
        textAlign="center"
        sx={{ mt: { xs: 0, lg: 1.5 } }}
      >
        {props.subtitle.length <= 0 ? "-" : props.subtitle}
      </Typography>
      <Typography
        variant={props.titleFontVariant ? props.titleFontVariant : "h3"}
        fontWeight="bold"
        textAlign="center"
      >
        {props.title === null ? (
          <Box sx={{ animation: `${pulse} 2s linear infinite` }}>-</Box>
        ) : (
          props.title
        )}
      </Typography>
    </Box>
  )
}
