import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MuiDrawer from '@mui/material/Drawer';

const contractedWidth = 160;
const expandedWidth = 260;

export interface DrawerProps {
  isExpanded?: boolean;
}

// width={isViewportAboveLg ? undefined : 100}
export const Drawer = ({ isExpanded }: DrawerProps) => {
  const width = isExpanded ? expandedWidth : contractedWidth;
  return (
    <MuiDrawer
      variant="permanent"
      anchor="left"
      sx={{
        width,
        flexShrink: 0,
        // mr: 1,
        '& .MuiDrawer-paper': {
          width,
          flexShrink: 0,
          boxSizing: 'border-box',
          backgroundColor: 'primary.main',
        },
      }}
    >
      <List>
        {['Home', 'Blog', 'Projects'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
