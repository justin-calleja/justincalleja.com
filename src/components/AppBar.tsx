import { useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './Drawer';
import ToggleColorModeBtn from './ToggleColorModeBtn';
import useColorMode from '../utils/useColorMode';

export const AppBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const colorMode = useColorMode();

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
            <ToggleColorModeBtn
              sx={{ mr: 2 }}
              onClick={colorMode?.toggleColorMode}
            />
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              <MenuIcon sx={{ color: 'primary.contrastText' }} />
            </IconButton>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </Box>
  );
};
