import { createTheme, type Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    /** Warm off-white for alternating sections (journey, timeline, keynote). */
    tint: string;
  }
}

export const serif = `var(--font-pt-serif-caption), "PT Serif Caption", Georgia, serif`;
const sans = `var(--font-source-sans), "Source Sans 3", "Helvetica Neue", Arial, sans-serif`;

/**
 * The collegiate uppercase label used by the header nav, the Join Us button,
 * and the members-calendar view toggle. One definition so a brand tweak
 * lands everywhere at once.
 */
export const NAV_LABEL_TYPOGRAPHY = {
  fontSize: "0.8125rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
} as const;

/** The sticky header's height (Header.tsx); sticky content sits below it. */
export const HEADER_HEIGHT = { xs: 64, md: 72 } as const;

/** The small scarlet uppercase kicker above a heading or label (DESIGN.md "eyebrow"). */
export const EYEBROW_TYPOGRAPHY = {
  color: "primary.main",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
} as const;

/** Popups that float over the page get a hairline instead of a shadow. */
const floatingPaper = ({ theme }: { theme: Theme }) => ({
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,
});

const theme = createTheme({
  typography: {
    fontFamily: sans,
    h1: {
      fontFamily: serif,
      fontSize: "clamp(2.75rem, 5.5vw + 1rem, 5.25rem)",
      lineHeight: 1.08,
      letterSpacing: "-0.015em",
    },
    h2: {
      fontFamily: serif,
      fontSize: "clamp(2.25rem, 3.5vw + 1rem, 3.5rem)",
      lineHeight: 1.12,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: serif,
      fontSize: "clamp(1.75rem, 2vw + 0.9rem, 2.5rem)",
      lineHeight: 1.18,
      letterSpacing: "-0.005em",
    },
    h4: {
      fontFamily: serif,
      fontSize: "clamp(1.35rem, 1.2vw + 0.9rem, 1.75rem)",
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: sans,
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: sans,
      fontSize: "1.1rem",
      fontWeight: 600,
      lineHeight: 1.45,
    },
    subtitle1: {
      fontFamily: sans,
      fontSize: "1.125rem",
      lineHeight: 1.6,
    },
    body1: {
      fontFamily: sans,
      fontSize: "1.0625rem",
      lineHeight: 1.65,
    },
    body2: {
      fontFamily: sans,
      fontSize: "0.9375rem",
      lineHeight: 1.6,
    },
    // variant="overline" is the eyebrow too ("Members", directory section
    // labels), so it shares EYEBROW_TYPOGRAPHY's weight and tracking. Color
    // stays at the call site: filter labels use ink, not scarlet.
    overline: {
      fontWeight: EYEBROW_TYPOGRAPHY.fontWeight,
      letterSpacing: EYEBROW_TYPOGRAPHY.letterSpacing,
      lineHeight: 1.6,
    },
    button: {
      fontFamily: sans,
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
  },
  palette: {
    primary: {
      light: "#DD8697",
      main: "#ba0c2f",
      dark: "#8e0a24",
    },
    secondary: {
      main: "#fff",
      light: "#646A6E",
      dark: "#000",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    text: {
      primary: "#17181a",
      secondary: "#494f53",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
      tint: "#f9f6f6",
    },
    divider: "rgba(23, 24, 26, 0.12)",
    // Deliberately distinct from primary scarlet (#ba0c2f) so a form error
    // never reads as a brand accent. Standard Material red/green 800s —
    // desaturated enough to sit quietly next to the brand color.
    error: {
      light: "#e57373",
      main: "#c62828",
      dark: "#8e0000",
    },
    success: {
      light: "#66bb6a",
      main: "#2e7d32",
      dark: "#1b5e20",
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
          borderRadius: 0,
          boxShadow: "none",
          padding: "0.625rem 1.5rem",
          transition: "background-color 0.2s ease, color 0.2s ease",
          "&:focus-visible": {
            outline: "2px solid #ba0c2f",
            outlineOffset: "3px",
          },
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#8e0a24",
            boxShadow: "none",
          },
        },
        outlinedPrimary: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
            backgroundColor: "rgba(186, 12, 47, 0.06)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(12px)",
          color: "#17181a",
          boxShadow: "none",
          borderBottom: "1px solid rgba(23, 24, 26, 0.1)",
        },
      },
    },
    // No shadows (DESIGN.md) on Paper overlays. MuiPopover covers MuiMenu
    // and Select; dialogs and drawers sit on a backdrop, so no hairline.
    MuiPopover: {
      styleOverrides: {
        paper: floatingPaper,
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: floatingPaper,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { boxShadow: "none" },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { boxShadow: "none" },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          "&:focus-visible": {
            outline: "2px solid #ba0c2f",
            outlineOffset: "2px",
          },
        },
      },
    },
    // First form inputs in the repo — square corners and a scarlet focus
    // ring to match MuiButton, since nothing here inherits those for free.
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(23, 24, 26, 0.23)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#17181a",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ba0c2f",
            borderWidth: "2px",
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#c62828",
          },
        },
        input: {
          "&:-webkit-autofill": {
            // Square-corner-compatible override of Chrome's autofill yellow,
            // which otherwise ignores border-radius and looks out of place.
            boxShadow: "0 0 0 1000px #ffffff inset",
            WebkitTextFillColor: "#17181a",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": { color: "#ba0c2f" },
          "&.Mui-error": { color: "#c62828" },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          fontSize: "0.8125rem",
        },
      },
    },
    // ButtonBase sets `outline: 0`, which beats the global :focus-visible
    // ring in globals.css, so anything built on it (cards, icon buttons,
    // toggles) needs the ring restored here. MuiButton and MuiLink keep
    // their own, with a larger offset.
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-focusVisible": {
            outline: "2px solid #ba0c2f",
            outlineOffset: "2px",
          },
        },
      },
    },
    // Scarlet selected state for every view toggle (members calendar,
    // alumni directory). `:hover` is listed too because MUI's own
    // `.Mui-selected:hover` rule is more specific and, on touch screens where
    // a tap leaves :hover stuck, would swap in a pale grey under white text.
    // Only hover-capable devices get the darker shade.
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected, &.Mui-selected:hover": {
            color: "#fff",
            backgroundColor: "#ba0c2f",
          },
          "@media (hover: hover)": {
            "&.Mui-selected:hover": { backgroundColor: "#8e0a24" },
          },
        },
      },
    },
    // First chips in the repo (alumni directory filters). Chip hardcodes a
    // pill radius instead of reading shape.borderRadius.
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
  },
});

export default theme;
