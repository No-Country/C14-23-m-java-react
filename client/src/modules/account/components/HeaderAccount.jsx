import React from 'react';
import Lottie from 'lottie-react';
import ConfUser from '../../../assets/LottiesAnimations/confUserLottie.json';
import { Box, Typography } from '@mui/material';

function HeaderAccount() {
  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems='center'
      padding='1rem'
      bgcolor='#dcdcdc'
    >
      <Box flex={{ xs: 'none', sm: '1' }} maxWidth={{ lg: '20%' }}>
        <Lottie animationData={ConfUser} />
      </Box>
      <Box flex='1'>
        <Typography variant='h5' margin='1rem'>
          Administra tu cuenta
        </Typography>
        <Typography textAlign='justify' margin='1rem'>
          En esta sección tendrás la posibilidad de modificar y actualizar tu
          información personal: Nombre, Apellido, Contraseña y Dirección de
          correo electrónico. Esto te permitirá gestionar tu cuenta de manera
          efectiva y mantener tus datos actualizados en todo momento.
        </Typography>
      </Box>
    </Box>
  );
}

export default HeaderAccount;
