import type { Theme as MuiTheme } from '@mui/material/styles/createTheme';
import type { CSSProperties } from 'react';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// https://colorhunt.co/palette/313552b8405e2eb086eee6ce

export interface Theme extends MuiTheme {}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    // blogPostH1: true;
    smallerH1: true;
    smallerH2: true;
    smallerH3: true;
    smallerH4: true;
    smallerH5: true;
    smallerH6: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    // blogPostH1: CSSProperties;
    // smaller: CSSProperties;
    smallerH1: CSSProperties;
    smallerH2: CSSProperties;
    smallerH3: CSSProperties;
    smallerH4: CSSProperties;
    smallerH5: CSSProperties;
    smallerH6: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    // blogPostH1?: CSSProperties;
    // smaller?: CSSProperties;
    smallerH1?: CSSProperties;
    smallerH2?: CSSProperties;
    smallerH3?: CSSProperties;
    smallerH4?: CSSProperties;
    smallerH5?: CSSProperties;
    smallerH6?: CSSProperties;
  }
}

const fontFamily = `"Montserrat", "Helvetica", "Arial", sans-serif`;

export const theme: Theme = responsiveFontSizes(
  createTheme({
    typography: {
      // fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      // fontFamily: `"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif`,
      fontFamily,
      fontSize: 14,
      body1: {
        fontSize: '1.4rem',
      },
    },
    // secondaryTypography: {},
    palette: {
      primary: {
        main: '#313552',
        contrastText: '#fff',
      },
      secondary: {
        main: '#B8405E',
        // main: '#EEE6CE',
      },
      error: {
        main: '#ff1744',
      },
      success: {
        main: '#2EB086',
      },
      info: {
        main: '#EEE6CE',
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
  }),
);

const themeWithSmallerFont = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily,
      fontSize: 8,
    },
  }),
);

// console.log('>>>', themeWithSmallerFont.typography);
theme.typography.smallerH1 = themeWithSmallerFont.typography.h1;
theme.typography.smallerH2 = themeWithSmallerFont.typography.h2;
theme.typography.smallerH3 = themeWithSmallerFont.typography.h3;
theme.typography.smallerH4 = themeWithSmallerFont.typography.h4;
theme.typography.smallerH5 = themeWithSmallerFont.typography.h5;
theme.typography.smallerH6 = themeWithSmallerFont.typography.h6;

// {
//   ...theme.typography,
//   // h1: { ...themeWithSmallerFont.typography.h1 },
//   // h1: themeWithSmallerFont.typography.h2,
//   // ...themeWithSmallerFont.typography.h3,
//   // ...themeWithSmallerFont.typography.h4,
//   // ...themeWithSmallerFont.typography.h5,
//   // ...themeWithSmallerFont.typography.h6,
//   fontFamily: theme.typography.fontFamily,
// };

// Set blogPostH1's responsive font sizes based on themeWithSmallerFont.
// theme.typography.blogPostH1 = {
//   ...themeWithSmallerFont.typography.h1,
//   fontFamily: theme.typography.fontFamily,
// };

// console.log('theme:', theme);
