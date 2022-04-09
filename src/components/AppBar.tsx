import type { Theme } from '../theme';

import { useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import useTheme from '@mui/styles/useTheme';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Drawer from './Drawer';
import useColorMode from '../utils/useColorMode';

export const AppBar = () => {
  const theme = useTheme<Theme>();
  const colorMode = useColorMode();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer isExpanded open={isOpen} onClose={() => setIsOpen(false)} />
      <MuiAppBar enableColorOnDark position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                color: 'primary.contrastText',
              }}
            >
              Justin Calleja
            </Typography>
            <IconButton
              sx={{ mr: 2 }}
              onClick={colorMode?.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              <MenuIcon sx={{ color: 'primary.contrastText' }} />
            </IconButton>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </Box>
  );
};
