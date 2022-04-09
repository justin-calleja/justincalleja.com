import type { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import type { ReactNode } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ToggleColorModeBtn from './ToggleColorModeBtn';
import useColorMode from '../utils/useColorMode';

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

const selectedListItemStyles = {
  backgroundColor: 'primary.light',
  '&:hover': {
    backgroundColor: 'primary.light',
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
};

const ListLink = ({ children, href, isSelected, onClick }: ListLinkProps) => {
  return (
    <Link href={href} passHref>
      <ListItem
        sx={{
          ...(isSelected && selectedListItemStyles),
          py: 2,
        }}
      >
        <ListItemButton onClick={onClick}>
          <ListItemText
            sx={{
              textAlign: 'center',
            }}
            primaryTypographyProps={{
              color: 'primary.contrastText',
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
          backgroundColor: 'primary.main',
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
            color: 'primary.contrastText',
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
