import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

// grey 7a7a7a
// primary 01161e
// green 07f49e
// red c4282d
// blue 0380b6

// color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e4e4e4",
          200: "#cacaca",
          300: "#afafaf",
          400: "#959595",
          500: "#7a7a7a",
          600: "#626262",
          700: "#494949",
          800: "#313131",
          900: "#181818",
        },
        primary: {
          100: "#ccd0d2",
          200: "#99a2a5",
          300: "#677378",
          400: "#34454b",
          500: "#01161e",
          600: "#011218",
          700: "#010d12",
          800: "#00090c",
          900: "#000406",
        },
        greenAccent: {
          100: "#cdfdec",
          200: "#9cfbd8",
          300: "#6af8c5",
          400: "#39f6b1",
          500: "#07f49e",
          600: "#06c37e",
          700: "#04925f",
          800: "#03623f",
          900: "#013120",
        },
        redAccent: {
          100: "#f3d4d5",
          200: "#e7a9ab",
          300: "#dc7e81",
          400: "#d05357",
          500: "#c4282d",
          600: "#9d2024",
          700: "#76181b",
          800: "#4e1012",
          900: "#270809",
        },
        blueAccent: {
          100: "#cde6f0",
          200: "#9acce2",
          300: "#68b3d3",
          400: "#3599c5",
          500: "#0380b6",
          600: "#026692",
          700: "#024d6d",
          800: "#013349",
          900: "#011a24",
        },
        priorityColors: {
          NULA: "#626262",
          BAJA: "#619b8a",
          MEDIA: "#F8961E",
          ALTA: "#F3722C",
          URGENTE: "#F94144",
          INACTIVO: "#001219",
        },
        tracingColors: {
          ACEPTA_CARGO: "#626262",
          ACTO_PERICIAL_REALIZADO: "#619b8a",
          PERICIA_REALIZADA: "#577590",
          SENTENCIA_O_CONVENIO_DE_PARTES: "#005f73",
          HONORARIOS_REGULADOS: "#F8961E",
          EN_TRATATIVA_DE_COBRO: "#F94144",
          COBRADO: "#6e44ff",
        },
      }
    : {
        grey: {
          100: "#181818",
          200: "#313131",
          300: "#494949",
          400: "#626262",
          500: "#7a7a7a",
          600: "#959595",
          700: "#afafaf",
          800: "#cacaca",
          900: "#e4e4e4",
        },
        primary: {
          100: "#000406",
          200: "#00090c",
          300: "#010d12",
          400: "#011218",
          500: "#01161e",
          600: "#34454b",
          700: "#677378",
          800: "#99a2a5",
          900: "#ccd0d2",
        },
        greenAccent: {
          100: "#013120",
          200: "#03623f",
          300: "#04925f",
          400: "#06c37e",
          500: "#07f49e",
          600: "#39f6b1",
          700: "#6af8c5",
          800: "#9cfbd8",
          900: "#cdfdec",
        },
        redAccent: {
          100: "#270809",
          200: "#4e1012",
          300: "#76181b",
          400: "#9d2024",
          500: "#c4282d",
          600: "#d05357",
          700: "#dc7e81",
          800: "#e7a9ab",
          900: "#f3d4d5",
        },
        blueAccent: {
          100: "#011a24",
          200: "#013349",
          300: "#024d6d",
          400: "#026692",
          500: "#0380b6",
          600: "#3599c5",
          700: "#68b3d3",
          800: "#9acce2",
          900: "#cde6f0",
        },
        priorityColors: {
          NULA: "#626262",
          BAJA: "#619b8a",
          MEDIA: "#F8961E",
          ALTA: "#F3722C",
          URGENTE: "#F94144",
          INACTIVO: "#001219",
        },
        tracingColors: {
          ACEPTA_CARGO: "#626262",
          ACTO_PERICIAL_REALIZADO: "#619b8a",
          PERICIA_REALIZADA: "#577590",
          SENTENCIA_O_CONVENIO_DE_PARTES: "#005f73",
          HONORARIOS_REGULADOS: "#F8961E",
          EN_TRATATIVA_DE_COBRO: "#F94144",
          COBRADO: "#6e44ff",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.grey[900],
            },
          }),
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(", "),
      fontSize: 12,
      h1: {
        fontFamily: ["Montserrat", "sans-serif"].join(", "),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Montserrat", "sans-serif"].join(", "),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Montserrat", "sans-serif"].join(", "),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Montserrat", "sans-serif"].join(", "),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Montserrat", "sans-serif"].join(", "),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Montserrat", "sans-serif"].join(", "),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
