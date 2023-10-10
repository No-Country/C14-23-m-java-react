import { React, useState } from "react";
import NavbarListDrawer from "./NavbarListDrawer";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShowChartIcon from "@mui/icons-material/ShowChart";

const navLinks = [
  { title: "Inicio", path: "/", icon: <HomeIcon /> },
  { title: "Estadisticas", path: "/statistics", icon: <BarChartIcon /> },
  { title: "Usuario", path: "/user", icon: <AccountCircleIcon /> },
  { title: "Historial", path: "/financialHistory", icon: <ShowChartIcon /> },
];

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: "#8c8c8c" }}>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{display : {xs : 'flex', md : 'none'}}}
          >
            <MenuIcon  />

            <Typography variant="h6">
                Menu
            </Typography>
          </IconButton>

          <Box sx={{ display: {xs : 'none', md : 'block'} }}>
            {" "}
            {/**para lograr responsive que se vea un menu o el otro */}
            {navLinks.map((item) => (
              <Button
                color="inherit"
                key={item.title}
                component="a"
                href={item.path}
              >
                {item.title}
              </Button>
            ))}
            <Button color="inherit" component="a" href="#cerrar sesion">
              Cerrar sesion
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        <NavbarListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
}

export default NavBar;
