import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: `var(--font-public-sans), sans-serif`,
    h1: {
      fontFamily: `var(--font-pt-serif-caption), serif`,
      fontSize: "8rem",
    },
    h2: {
      fontFamily: `var(--font-pt-serif-caption), serif`,
      fontSize: "6rem",
    },
    h3: {
      fontFamily: `var(--font-pt-serif-caption), serif`,
      fontSize: "3rem",
    },
    h4: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  palette: {
    primary: {
      light: "#DD8697",
      main: "#ba0c2f",
    },
    secondary: {
      main: "#fff",
      light: "#646A6E",
      dark: "#000",
    },
    grey: {
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
      primary: "#000",
      secondary: "#646A6E",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
          borderRadius: "0px",
          boxShadow: "none",
          padding: "0.5rem 1rem",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color: "#646A6E",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
