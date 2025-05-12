"use client";

import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./createEmotionCache";
import theme from "./theme";

const clientSideEmotionCache = createEmotionCache();

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
