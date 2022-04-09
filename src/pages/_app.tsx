import type { AppProps as NextAppProps } from 'next/app';
import type { NextPageWithLayout } from '../types';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '../components/ThemeProvider';

// import '../styles/globals.css';

type AppProps = NextAppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider>
      <CssBaseline />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default MyApp;
