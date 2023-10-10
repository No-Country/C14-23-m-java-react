import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import React from "react";

function NavbarListDrawer({ navLinks }) {
  return (
    <Box sx={{ width: 250, bgcolor: "#8c8c8c" }}>
      <nav>
        <List>
          {navLinks.map((item) => (
            <ListItem disablePadding key={item.title}>
              <ListItemButton component="a" href= {item.path} >
                <ListItemIcon>
                  {item.icon}
                  <ListItemText primary= {item.title} />
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
            <ListItemButton component="a" href="#cerrarSesiond">
              <ListItemIcon>
                <ExitToAppIcon />
                <ListItemText primary="Cerrar sesion" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

export default NavbarListDrawer;
