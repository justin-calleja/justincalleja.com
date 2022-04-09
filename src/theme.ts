import type { PaletteMode } from '@mui/material';
import type { Theme as MuiTheme } from '@mui/material/styles/createTheme';
import type { TypographyOptions } from '@mui/material/styles/createTypography';
import type { ThemeOptions } from '@mui/material/styles';
// import type { CSSProperties } from 'react';

import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
// import { amber, deepOrange, grey } from '@mui/material/colors';

// https://colorhunt.co/palette/313552b8405e2eb086eee6ce

export interface Theme extends MuiTheme {}

// declare module '@mui/material/Typography' {
//   interface TypographyPropsVariantOverrides {
//     // blogPostH1: true;
//     smallerH1: true;
//     smallerH2: true;
//     smallerH3: true;
//     smallerH4: true;
//     smallerH5: true;
//     smallerH6: true;
//   }
// }

// declare module '@mui/material/styles' {
//   interface TypographyVariants {
//     // blogPostH1: CSSProperties;
//     // smaller: CSSProperties;
//     smallerH1: CSSProperties;
//     smallerH2: CSSProperties;
//     smallerH3: CSSProperties;
//     smallerH4: CSSProperties;
//     smallerH5: CSSProperties;
//     smallerH6: CSSProperties;
//   }

//   // allow configuration using `createTheme`
//   interface TypographyVariantsOptions {
//     // blogPostH1?: CSSProperties;
//     // smaller?: CSSProperties;
//     smallerH1?: CSSProperties;
//     smallerH2?: CSSProperties;
//     smallerH3?: CSSProperties;
//     smallerH4?: CSSProperties;
//     smallerH5?: CSSProperties;
//     smallerH6?: CSSProperties;
//   }
// }

const secondaryMain = '#d6acff';
const contrastText = '#f8f8f2';
// const secondaryMain = '#ff6e6e'
// const divider = '#69ff94';

export const getPalette = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#282A36',
            contrastText,
          },
          secondary: {
            main: secondaryMain,
          },
        }
      : {
          primary: {
            main: '#343746',
            contrastText,
          },
          secondary: {
            main: secondaryMain,
          },
          // divider,
          // divider: deepOrange[700],
          // background: {
          //   default: deepOrange[900],
          //   paper: deepOrange[900],
          // },
          // text: {
          //   primary: '#fff',
          //   secondary: grey[500],
          // },
        }),
  },
});

// export const theme: Theme = responsiveFontSizes(
//   createMuiTheme(),
// );

const createResponsiveTypography = (typography: TypographyOptions) =>
  responsiveFontSizes(createMuiTheme({ typography }));

const fontFamily = `"Montserrat", "Helvetica", "Arial", sans-serif`;
const themeWithSmallerFont = createResponsiveTypography({
  fontFamily,
  fontSize: 9,
});
const themeWithSmallestFont = createResponsiveTypography({
  fontFamily,
  fontSize: 8,
});

/**
 * Wraps MUI's createTheme to make some adjustments to generated theme.
 */
export const createTheme = (options?: ThemeOptions): Theme => {
  const theme = responsiveFontSizes(
    createMuiTheme(
      deepmerge(
        {
          typography: {
            fontFamily,
            fontSize: 16,
            // Overwrite the body fonts to bump them up:
            body1: {
              fontSize: '1.4rem',
            },
            body2: {
              fontSize: '1.2rem',
            },
          },
          palette: {
            primary: {
              // main: '#313552',
              main: '#282A36',
              contrastText: '#eee',
            },
            secondary: {
              main: '#B8405E',
              // main: '#EEE6CE',
            },
            // mode: 'dark',
          },
          // E.g. of overwriting global component styles:
          // import sx from '@mui/system/sx';
          // components: {
          // MuiListItemButton: {
          //   styleOverrides: {
          //     root: sx({
          //       '&.Mui-selected': {
          //         backgroundColor: 'primary.light',
          //       },
          //       '&.Mui-selected:hover': {
          //         backgroundColor: 'primary.light',
          //       },
          //     }),
          //   },
          // },
          // },
          ...options,
        },
        options,
      ),
    ),
  );

  theme.typography.h1 = themeWithSmallestFont.typography.h1;
  theme.typography.h2 = themeWithSmallerFont.typography.h2;
  theme.typography.h3 = themeWithSmallerFont.typography.h3;
  theme.typography.h4 = themeWithSmallerFont.typography.h4;
  theme.typography.h5 = themeWithSmallerFont.typography.h5;
  theme.typography.h6 = themeWithSmallerFont.typography.h6;

  return theme;
};

// console.log('theme:', theme);
