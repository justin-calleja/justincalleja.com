import type { LayoutFunction } from '../types';
import type { Theme } from '../theme';

import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import useTheme from '@mui/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import { AppBar } from './AppBar';
import Drawer from './Drawer';

export interface AppBarLayoutProps {
  children: ReactNode;
}

export const AppBarLayout = (props: AppBarLayoutProps) => {
  const { children, ...rest } = props;
  const theme = useTheme<Theme>();
  const isViewportAboveMd = useMediaQuery(theme.breakpoints.up('md'));
  const isViewportAboveLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isViewportAboveXl = useMediaQuery(theme.breakpoints.up('xl'));

  return (
    <>
      {!isViewportAboveMd && <AppBar {...rest} />}
      <Box display="flex">
        {isViewportAboveMd && <Drawer isExpanded={isViewportAboveLg} />}
        <Container
          sx={{ pt: 2 }}
          maxWidth={isViewportAboveXl ? 'lg' : isViewportAboveLg ? 'md' : 'lg'}
        >
          {children}
        </Container>
      </Box>
    </>
  );
};

export const getLayout: LayoutFunction = (page) => (
  <AppBarLayout>{page}</AppBarLayout>
);
