import type { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import type { ReactNode } from 'react';

import Link from 'next/link';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const contractedWidth = 160;
const expandedWidth = 260;

export interface DrawerProps extends MuiDrawerProps {
  isExpanded?: boolean;
}

export interface DrawerItemProps {
  children: ReactNode;
  href: string;
  onClick?: (...args: any) => void;
}

const DrawerItem = ({ children, href, onClick }: DrawerItemProps) => {
  return (
    <Link href={href} passHref>
      <ListItem button onClick={onClick}>
        <ListItemText
          primary={children}
          primaryTypographyProps={{
            color: 'primary.contrastText',
          }}
        />
      </ListItem>
    </Link>
  );
};

export const Drawer = ({ isExpanded, children, ...rest }: DrawerProps) => {
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
        <DrawerItem href="/" onClick={rest.onClose}>
          Home
        </DrawerItem>
        <DrawerItem href="/blog" onClick={rest.onClose}>
          Blog
        </DrawerItem>
        <DrawerItem href="/" onClick={rest.onClose}>
          Projects
        </DrawerItem>
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
