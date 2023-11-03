import React from 'react';
import Lottie from 'lottie-react';
import SavingsLottie from '../../../assets/LottiesAnimations/SavingLotties.json';
import { Box, Typography } from '@mui/material';

function SectionInfo() {
  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems='center'
      padding='1rem'
      bgcolor='#dcdcdc'
    >
      <Box flex={{ xs: 'none', sm: '1' }} maxWidth={{ lg: '12%' }}>
        <Lottie animationData={SavingsLottie} />
      </Box>
      <Box flex='1'>
        <Typography variant='h5' margin='1rem'>
          Gestiona Tus Ahorros
        </Typography>
        <Typography textAlign='justify' margin='1rem'>
          Aquí podrás establecer y modificar tus metas de ahorro mensuales.
          También podrás Reiniciar tus Ahorros con un solo clic haciendo que
          vuelvan a cero para poder configurar tus metas nuevamente. ¡Esto te
          permitirá tomar el control de tus finanzas y lograr tus objetivos
          financieros!
        </Typography>
      </Box>
    </Box>
  );
}

export default SectionInfo;
