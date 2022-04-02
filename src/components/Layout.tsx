import type { LayoutFunction } from '../types';
import type { Theme } from '../theme';

import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import useTheme from '@mui/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppBar } from './AppBar';
import { Container } from './Container';
import Drawer from './Drawer';

export interface AppBarLayoutProps {
  children: ReactNode;
}

export const AppBarLayout = (props: AppBarLayoutProps) => {
  const { children, ...rest } = props;
  const theme = useTheme<Theme>();
  const isViewportAboveMd = useMediaQuery(theme.breakpoints.up('md'));
  const isViewportAboveLg = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      {!isViewportAboveMd && <AppBar {...rest} />}
      <Box display="flex">
        {isViewportAboveMd && <Drawer isExpanded={isViewportAboveLg} />}
        <Container
          sx={{ pt: 2 }}
          maxWidth={isViewportAboveLg ? 'md' : isViewportAboveMd ? 'sm' : 'lg'}
        >
          {children}
        </Container>
      </Box>
    </>
  );
  // return (
  //   <Box display={isViewportAboveMd ? 'flex' : 'block'}>
  //     {isViewportAboveMd ? (
  //       <Drawer isExpanded={isViewportAboveLg} />
  //     ) : (
  //       <AppBar {...rest} />
  //     )}
  //     <Container
  //       maxWidth={isViewportAboveLg ? 'md' : isViewportAboveMd ? 'sm' : 'lg'}
  //       sx={{ pt: 2 }}
  //     >
  //       {children}
  //     </Container>
  //   </Box>
  // );
};

export const getLayout: LayoutFunction = (page) => (
  <AppBarLayout>{page}</AppBarLayout>
);
