import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function NavbarListDrawer({ navLinks }) {
  NavbarListDrawer.propTypes = {
    navLinks: PropTypes.array.isRequired,
  };

  return (
    <Box sx={{ width: 250, bgcolor: '#8c8c8c' }}>
      <nav>
        <List>
          {navLinks.map((item) => (
            <ListItem disablePadding key={item.title}>
              <ListItemButton component={NavLink} to={item.path}>
                <ListItemIcon>
                  {item.icon}
                  <ListItemText primary={item.title} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>

      <Divider />
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton component='a' href='#'>
              <ListItemIcon>
                <ExitToAppIcon />
                <ListItemText primary='Cerrar sesión' />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

export default NavbarListDrawer;
