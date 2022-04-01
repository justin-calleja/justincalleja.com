import type { Theme as MuiTheme } from '@mui/material/styles/createTheme';
import type { CSSProperties } from 'react';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// https://colorhunt.co/palette/313552b8405e2eb086eee6ce

export interface Theme extends MuiTheme {}

declare module '@mui/material/Typography' {
  // Add 'blogPostH1' as a possible `variant` prop value on <Typography /> component
  interface TypographyPropsVariantOverrides {
    blogPostH1: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    blogPostH1: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    blogPostH1?: CSSProperties;
  }
}

export const theme: Theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontSize: 14,
      body1: {
        fontSize: '1.2rem',
      },
    },
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
      fontSize: 11,
    },
  }),
);

// Set blogPostH1's responsive font sizes based on themeWithSmallerFont.
theme.typography.blogPostH1 = { ...themeWithSmallerFont.typography.h1 };

// console.log('theme:', theme);
