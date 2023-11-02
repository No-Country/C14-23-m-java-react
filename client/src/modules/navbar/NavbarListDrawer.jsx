import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';

function NavbarListDrawer({ navLinks }) {
  NavbarListDrawer.propTypes = {
    navLinks: PropTypes.array.isRequired,
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();

  const handleLogOut = () => {
    Cookies.remove('token');
    navigate('/');
    setModalOpen(false);
    localStorage.removeItem('userData');
  };

  const cookie = Cookies.get('token');

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        bgcolor: '#00796B',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <nav>
        <List>
          {navLinks.map((item) => (
            <ListItem disablePadding key={item.title}>
              <ListItemButton component={NavLink} to={item.path}>
                <ListItemIcon>
                  {item.icon}
                  <ListItemText
                    sx={{ color: '#FEFEFE' }}
                    primary={item.title}
                  />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>

      <Divider />
      {cookie && (
        <nav>
          <List>
            <ListItem disablePadding onClick={handleModalOpen}>
              <ListItemButton>
                <ListItemIcon>
                  <ExitToAppIcon sx={{ color: '#FEFEFE' }} />
                  <ListItemText
                    sx={{ color: '#FEFEFE' }}
                    primary='Cerrar sesión'
                  />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      )}

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
    </Box>
  );
}

export default NavbarListDrawer;
