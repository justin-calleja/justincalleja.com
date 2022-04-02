import type { Theme } from '../theme';

import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Container } from './Container';

export const AppBar = () => {
  const router = useRouter();
  const theme = useTheme<Theme>();
  //   const isViewportBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const isViewportBelowSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar enableColorOnDark position="static">
        <Container>
          <Toolbar>
            <NextLink href="/">
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  color: 'primary.contrastText',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                {`${isViewportBelowSm ? 'Home' : 'Justin Calleja'}`}
              </Typography>
            </NextLink>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </Box>
  );
};
