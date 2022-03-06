import type { Theme as MuiTheme } from '@mui/material/styles/createTheme';

import { createTheme } from '@mui/material/styles';

// https://colorhunt.co/palette/313552b8405e2eb086eee6ce

export interface Theme extends MuiTheme {}

export const theme: Theme = createTheme({
  typography: {
    fontSize: 16,
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
});

// console.log('theme:', theme);
