import type { ReactNode } from 'react';
import type { PaletteMode } from '@mui/material';

import { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, getPalette } from '../theme';

export type ColorModeContextType = {
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined,
);

export type ThemeProviderProps = {
  children: ReactNode;
};

export const colorModeLSKey = 'colorMode';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? 'dark' : 'light',
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem(colorModeLSKey, newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = useMemo(() => createTheme(getPalette(mode)), [mode]);

  useEffect(() => {
    const colorModeLS = localStorage.getItem(
      colorModeLSKey,
    ) as PaletteMode | null;
    if (colorModeLS !== null) {
      // colorModeLS was retreived from LS so no need to also set LS.
      setMode(colorModeLS);
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
