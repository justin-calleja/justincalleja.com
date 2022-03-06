import type { AppProps as NextAppProps } from 'next/app';
import type { NextPageWithLayout } from '../types';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';

import '../styles/globals.css';

type AppProps = NextAppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default MyApp;
