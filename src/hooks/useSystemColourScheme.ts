/* Copyright (c) 2023 Michael Barlow */

import { Theme, ThemeOptions, createTheme, useMediaQuery } from "@mui/material";
import { useMemo } from "react";

export const useSystemColourScheme = (baseTheme?: ThemeOptions): Theme => {
  const systemPrefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          ...baseTheme?.palette,
          mode: systemPrefersDarkMode ? "dark" : "light",
        },
      }),
    [baseTheme, systemPrefersDarkMode]
  );
  return theme;
};
