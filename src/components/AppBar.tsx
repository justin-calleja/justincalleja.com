import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export const AppBar = () => {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar enableColorOnDark position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <NextLink href="/">
              <Typography
                variant="h4"
                component="div"
                sx={{
                  flexGrow: 1,
                  color: 'primary.contrastText',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                Justin Calleja
              </Typography>
            </NextLink>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </Box>
  );
};
