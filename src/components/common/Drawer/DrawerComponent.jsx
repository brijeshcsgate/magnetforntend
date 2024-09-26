// DrawerComponent.js

import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AlignJustifyIcon } from 'lucide-react';

const DrawerComponent = ({ title, items }) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {items.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>{title}</Button> */}
      {/* <a href="#" className="menu-btn"> */}
            <span onClick={toggleDrawer(true)}  className="menu-btn">
              
              <AlignJustifyIcon color='#fff'/>
            </span>
          {/* </a> */}
      <Drawer open={open} onClose={toggleDrawer(false)}   
      anchor='right' 
      > 
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
