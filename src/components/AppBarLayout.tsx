import type { LayoutFunction } from '../types';

import { ReactNode } from 'react';
import { AppBar } from './AppBar';
import { Container } from './Container';

export interface AppBarLayoutProps {
  children: ReactNode;
}

export const AppBarLayout = (props: AppBarLayoutProps) => {
  const { children, ...rest } = props;

  return (
    <>
      <AppBar {...rest} />
      <Container sx={{ pt: 2 }}>{children}</Container>
    </>
  );
};

export const getLayout: LayoutFunction = (page) => (
  <AppBarLayout>{page}</AppBarLayout>
);
