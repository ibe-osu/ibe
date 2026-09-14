import { createTheme } from "@mui/material/styles";
import { bodyFamily, displayFamily, monoFamily } from "./fonts";

declare module "@mui/material/styles" {
  interface Palette {
    /** Scarlet tuned for text and rules on the current ground. */
    signal: Palette["primary"];
  }
  interface PaletteOptions {
    signal?: PaletteOptions["primary"];
  }
  interface TypeBackground {
    /** A second, slightly deeper panel tint. */
    panel: string;
  }
}

const scarlet = "#ba0c2f";
const scarletDark = "#8e0a24";
const scarletBright = "#ff3b5c";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: scarlet,
          dark: scarletDark,
          light: scarletBright,
          contrastText: "#ffffff",
        },
        signal: {
          main: scarlet,
          dark: scarletDark,
          light: scarletBright,
          contrastText: "#ffffff",
        },
        secondary: { main: "#121114" },
        background: { default: "#ffffff", paper: "#fbf9f9", panel: "#f4f1f2" },
        text: { primary: "#121114", secondary: "#5d5358", disabled: "#8b8085" },
        divider: "rgba(18, 17, 20, 0.12)",
        action: { hover: "rgba(18, 17, 20, 0.04)" },
        error: { main: "#c62828" },
        success: { main: "#2e7d32" },
      },
    },
    dark: {
      palette: {
        primary: {
          main: scarlet,
          dark: scarletDark,
          light: scarletBright,
          contrastText: "#ffffff",
        },
        signal: {
          main: scarletBright,
          dark: scarlet,
          light: "#ff7088",
          contrastText: "#0b0b0d",
        },
        secondary: { main: "#f3f1f2" },
        background: { default: "#0b0b0d", paper: "#121214", panel: "#18181b" },
        text: { primary: "#f3f1f2", secondary: "#a9a1a4", disabled: "#75696e" },
        divider: "rgba(255, 255, 255, 0.11)",
        action: { hover: "rgba(255, 255, 255, 0.06)" },
        error: { main: "#ef5350" },
        success: { main: "#66bb6a" },
      },
    },
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: bodyFamily,
    h1: {
      fontFamily: displayFamily,
      fontWeight: 600,
      fontSize: "clamp(2.25rem, 4.6vw, 3.4rem)",
      lineHeight: 1.05,
      letterSpacing: "-0.035em",
    },
    h2: {
      fontFamily: displayFamily,
      fontWeight: 600,
      fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
      lineHeight: 1.1,
      letterSpacing: "-0.03em",
    },
    h3: {
      fontFamily: displayFamily,
      fontWeight: 600,
      fontSize: "clamp(1.2rem, 1.6vw, 1.5rem)",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontFamily: displayFamily,
      fontWeight: 600,
      fontSize: "1.15rem",
      lineHeight: 1.25,
      letterSpacing: "-0.015em",
    },
    h5: { fontFamily: bodyFamily, fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.4 },
    h6: { fontFamily: bodyFamily, fontWeight: 600, fontSize: "1rem", lineHeight: 1.45 },
    subtitle1: { fontFamily: bodyFamily, fontSize: "1.125rem", lineHeight: 1.6 },
    body1: { fontFamily: bodyFamily, fontSize: "1.0625rem", lineHeight: 1.6 },
    body2: { fontFamily: bodyFamily, fontSize: "0.9375rem", lineHeight: 1.55 },
    overline: {
      fontFamily: monoFamily,
      fontSize: "0.72rem",
      fontWeight: 500,
      letterSpacing: "0.12em",
      lineHeight: 1.5,
      textTransform: "uppercase",
    },
    button: { fontFamily: bodyFamily, fontWeight: 600, letterSpacing: "0" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiButton: {
      defaultProps: { variant: "contained", disableElevation: true },
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "none",
          fontSize: "0.95rem",
          padding: "0.625rem 1rem",
          borderRadius: theme.shape.borderRadius,
          boxShadow: "none",
          transition:
            "background-color 160ms cubic-bezier(0.25,1,0.5,1), border-color 160ms cubic-bezier(0.25,1,0.5,1), color 160ms cubic-bezier(0.25,1,0.5,1), transform 120ms cubic-bezier(0.25,1,0.5,1)",
          "&:hover": { transform: "translateY(-1px)" },
          "&:active": { transform: "translateY(0)" },
          "&:focus-visible": {
            outline: `2px solid ${theme.vars.palette.signal.main}`,
            outlineOffset: 3,
          },
          "@media (prefers-reduced-motion: reduce)": { transition: "none", "&:hover": { transform: "none" } },
        }),
        containedPrimary: { "&:hover": { backgroundColor: scarletDark, boxShadow: "none" } },
        outlined: ({ theme }) => ({
          borderColor: theme.vars.palette.divider,
          color: theme.vars.palette.text.primary,
          backgroundColor: theme.vars.palette.background.paper,
          "&:hover": {
            borderColor: theme.vars.palette.text.primary,
            backgroundColor: theme.vars.palette.background.paper,
          },
        }),
        sizeLarge: { padding: "0.8rem 1.25rem", fontSize: "1rem" },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:focus-visible": {
            outline: `2px solid ${theme.vars.palette.signal.main}`,
            outlineOffset: 2,
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:focus-visible": {
            outline: `2px solid ${theme.vars.palette.signal.main}`,
            outlineOffset: 2,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.background.paper,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: theme.vars.palette.divider },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.vars.palette.text.primary,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.vars.palette.signal.main,
            borderWidth: 2,
          },
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-focused": { color: theme.vars.palette.signal.main },
        }),
      },
    },
    MuiFormHelperText: { styleOverrides: { root: { marginLeft: 0, fontSize: "0.8125rem" } } },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({ backgroundColor: theme.vars.palette.background.default }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          border: `1px solid ${theme.vars.palette.divider}`,
          backgroundColor: theme.vars.palette.background.paper,
        }),
      },
    },
  },
});

export default theme;
