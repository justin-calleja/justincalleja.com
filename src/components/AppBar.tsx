import type { Theme } from '../theme';

import { useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import useTheme from '@mui/styles/useTheme';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import Slide from '@mui/material/Slide';
import { useRouter } from 'next/router';
import Drawer from './Drawer';

export const AppBar = () => {
  const router = useRouter();
  const theme = useTheme<Theme>();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* {isOpen && <Drawer isExpanded />} */}
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
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              <MenuIcon sx={{ color: 'primary.contrastText' }} />
            </IconButton>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </Box>
  );
};
