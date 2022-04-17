import { useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import useTheme from '@mui/styles/useTheme';
import Slide from '@mui/material/Slide';
import Drawer from './Drawer';
import ToggleColorModeBtn from './ToggleColorModeBtn';
import useColorMode from '../utils/useColorMode';
import { getPrimary, getPrimaryContrastText } from 'theme';

import type { Theme } from 'theme';
import type { SlideProps } from '@mui/material/Slide';

function HideOnScroll({ children }: { children: SlideProps['children'] }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const AppBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const colorMode = useColorMode();
  const theme = useTheme<Theme>();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer isExpanded open={isOpen} onClose={() => setIsOpen(false)} />
      <HideOnScroll>
        <MuiAppBar enableColorOnDark color={getPrimary(theme)}>
          <Container maxWidth="lg">
            <Toolbar>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                Justin Calleja
              </Typography>
              <ToggleColorModeBtn
                sx={{ mr: 2 }}
                onClick={colorMode?.toggleColorMode}
              />
              <IconButton onClick={() => setIsOpen(!isOpen)}>
                <MenuIcon sx={{ color: getPrimaryContrastText(theme) }} />
              </IconButton>
            </Toolbar>
          </Container>
        </MuiAppBar>
      </HideOnScroll>
      {/* This toolbar fixes issue with AppBar hiding content e.g. h1 in blog post */}
      <Toolbar />
    </Box>
  );
};
