import { useState } from 'react';
import NavbarListDrawer from './NavbarListDrawer';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Modal,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import logo from '../../assets/logos/logoCashFlow.png';

const navLinks = [
  { title: 'Inicio', path: '/home' },
  { title: 'Estadísticas', path: '/statistics' },
  { title: 'Ahorro', path: '/savings' },
  { title: 'Historial', path: '/financialHistory' },
  { title: 'Iniciar sesión', path: '/login' },
  { title: 'Registrarse', path: '/register' },
  { title: 'Cuenta', path: '/account' },
];

function NavBar() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLogOut = () => {
    logout();
    navigate('/');
    setModalOpen(false);
  };

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

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexGrow: 1,
            }}
          >
            <img
              src={logo}
              alt='Logo'
              style={{ height: '2rem', maxWidth: '20rem' }}
            />
          </Box>

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
            <Button color='inherit' onClick={handleModalOpen}>
              Cerrar sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={open} anchor='right' onClose={() => setOpen(false)}>
        <NavbarListDrawer navLinks={navLinks} />
      </Drawer>

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            width: {
              xs: '90%',
              sm: '80%',
            },
            maxWidth: '500px',
            bgcolor: '#fff',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            p: 2,
            gap: 2,
          }}
        >
          <Typography variant='h5'>
            ¿Estás seguro que deseas cerrar sesión?
          </Typography>
          <Box
            component='div'
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button type='button' onClick={handleLogOut} variant='contained'>
              si
            </Button>
            <Button
              type='button'
              onClick={handleModalClose}
              color='error'
              variant='contained'
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default NavBar;
