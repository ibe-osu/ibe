import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: `PT Serif Caption, serif`,
    h1: {
      fontSize: "8rem",
    },
    h2: {
      fontSize: "5rem",
    },
    h3: {
      fontSize: "3rem",
    },
    h4: {
      fontSize: "2.25rem",
    },
    h5: {
      fontSize: "1.5rem",
    },
    h6: {
      fontSize: "1.25rem",
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
