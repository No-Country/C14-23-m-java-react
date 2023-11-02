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
          Aquí podrás establecer tus metas de ahorro mensuales. Además, tendrás
          la opción de agregar fondos adicionales a tu meta en cualquier
          momento. Asimismo, el botón de restablecimiento te permitirá reiniciar
          tus metas de ahorro mensuales, dejándolas en cero para comenzar de
          nuevo.
        </Typography>
      </Box>
    </Box>
  );
}

export default SectionInfo;
