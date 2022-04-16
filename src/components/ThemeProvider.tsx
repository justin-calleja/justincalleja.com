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
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        // Running toggleColorMode means the user explicitly wants to
        // set the colorMode, so in here (rather than a useEffect dependent on mode)
        // we set the mode in local storage.
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

  // if (typeof window !== 'undefined') {
  //   window.theme = theme;
  // }

  useEffect(() => {
    const colorModeLS = localStorage.getItem(
      colorModeLSKey,
    ) as PaletteMode | null;
    if (colorModeLS === null) {
      setMode(prefersDarkMode ? 'dark' : 'light');
    } else {
      setMode(colorModeLS);
    }
  }, [prefersDarkMode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
