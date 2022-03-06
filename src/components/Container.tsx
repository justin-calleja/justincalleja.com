import type { ContainerProps } from '@mui/material/Container';

import MuiContainer from '@mui/material/Container';

export const Container = (props: ContainerProps) => (
  <MuiContainer maxWidth="lg" {...props} />
);
