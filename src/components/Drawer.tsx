import type { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import type { ReactNode } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export interface DrawerProps extends MuiDrawerProps {
  isExpanded?: boolean;
}

export interface DrawerItemProps {
  children: ReactNode;
  href: string;
  isSelected?: boolean;
  onClick?: (...args: any) => void;
}

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

const DrawerItem = ({
  children,
  href,
  isSelected,
  onClick,
}: DrawerItemProps) => {
  return (
    <Link href={href} passHref>
      <ListItem
        button
        onClick={onClick}
        sx={{ ...(isSelected && selectedListItemStyles) }}
      >
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
  const router = useRouter();
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
        <DrawerItem
          href="/"
          onClick={rest.onClose}
          isSelected={router.pathname === '/'}
        >
          Home
        </DrawerItem>
        <DrawerItem
          href="/blog"
          onClick={rest.onClose}
          isSelected={router.pathname.startsWith('/blog')}
        >
          Blog
        </DrawerItem>
        {/* <DrawerItem
          href="/projects"
          onClick={rest.onClose}
          isSelected={router.pathname.startsWith('/projects')}
        >
          Projects
        </DrawerItem> */}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
