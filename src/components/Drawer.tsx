import type { Theme } from 'theme';
import type { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import type { ReactNode } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import MuiDrawer from '@mui/material/Drawer';
import useTheme from '@mui/styles/useTheme';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ToggleColorModeBtn from './ToggleColorModeBtn';
import useColorMode from '../utils/useColorMode';
import { getPrimaryLight, getPrimaryDark, getPrimaryContrastText } from 'theme';

export interface DrawerProps extends MuiDrawerProps {
  isExpanded?: boolean;
}

export type ListLinkProps = {
  href: string;
  children: ReactNode;
  isSelected?: boolean;
  onClick?: (...args: any) => void;
};

const contractedWidth = 160;
const expandedWidth = 260;

const selectedListItemStyles = (theme: Theme) => ({
  backgroundColor: getPrimaryLight(theme),
  '& .MuiTypography-root': {
    fontWeight: 700,
  },
  '&:hover': {
    backgroundColor: getPrimaryLight(theme),
  },
  '::after': {
    display: 'block',
    position: 'absolute',
    right: '0px',
    bottom: '0px',
    content: '""',
    width: '4px',
    height: '100%',
    margin: '0px auto',
    backgroundColor: 'secondary.main',
  },
});

const ListLink = ({ children, href, isSelected, onClick }: ListLinkProps) => {
  const theme = useTheme<Theme>();

  return (
    <Link href={href} passHref>
      <ListItem
        className="fmlfml"
        sx={{
          ...(isSelected && selectedListItemStyles(theme)),
          py: 2,
        }}
      >
        <ListItemButton onClick={onClick}>
          <ListItemText
            sx={{
              textAlign: 'center',
            }}
          >
            {children}
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export const Drawer = ({ isExpanded, children, ...rest }: DrawerProps) => {
  const router = useRouter();
  const colorMode = useColorMode();
  const theme = useTheme<Theme>();
  const width = isExpanded ? expandedWidth : contractedWidth;

  return (
    <MuiDrawer
      anchor="left"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          flexShrink: 0,
          boxSizing: 'border-box',
          backgroundColor: getPrimaryDark(theme),
          color: getPrimaryContrastText(theme),
        },
      }}
      {...rest}
    >
      {children}
      <List>
        <ListLink
          href="/"
          onClick={rest.onClose}
          isSelected={router.pathname === '/'}
        >
          Home
        </ListLink>
        <ListLink
          href="/blog"
          onClick={rest.onClose}
          isSelected={router.pathname.startsWith('/blog')}
        >
          Blog
        </ListLink>
        <ListItem
          sx={{
            pt: 6,
          }}
        >
          <ListItemButton onClick={colorMode?.toggleColorMode}>
            <ToggleColorModeBtn sx={{ mx: 'auto' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
