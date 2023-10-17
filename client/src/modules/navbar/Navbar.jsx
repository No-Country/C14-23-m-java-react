import { useState } from 'react';
import NavbarListDrawer from './NavbarListDrawer';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { title: 'Landing', path: '/' },
  { title: 'Inicio', path: '/home' },
  { title: 'Estadísticas', path: '/statistics' },
  { title: 'Usuario', path: '/user' },
  { title: 'Historial', path: '/financialHistory' },
  { title: 'iniciar sesión', path: '/login' },
  { title: 'registrarse', path: '/register' },
];

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position='static'>
        <Toolbar sx={{ bgcolor: '#00796B' }}>
          <IconButton
            color='inherit'
            size='large'
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />

            <Typography variant='h6'>Menu</Typography>
          </IconButton>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {/**para lograr responsive que se vea un menu o el otro */}
            {navLinks.map((item) => (
              <Button
                key={item.title}
                component={NavLink}
                to={item.path}
                variant='contained'
                sx={{ mx: '5px' }}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#00796B' : 'transparent',
                  boxShadow: isActive ? 'none' : 'none',
                  border: isActive ? '1px solid white' : '1px solid #00796B',
                })}
              >
                {item.title}
              </Button>
            ))}
            <Button color='inherit' component='a' href='#cerrar sesion'>
              Cerrar sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={open} anchor='right' onClose={() => setOpen(false)}>
        <NavbarListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
}

export default NavBar;
