import React from 'react';
import Lottie from 'lottie-react';
import StatisticsImg from '../../../assets/LottiesAnimations/statisticsLottie.json';
import { Box, Typography } from '@mui/material';

function HeaderStatics() {
  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems='center'
      padding='1rem'
      bgcolor='#dcdcdc'
    >
      <Box flex={{ xs: 'none', sm: '1' }} maxWidth={{ lg: '14%' }}>
        <Lottie animationData={StatisticsImg} />
      </Box>
      <Box flex='1'>
        <Typography variant='h5' margin='1rem'>
          Tus estadísticas
        </Typography>
        <Typography textAlign='justify' margin='1rem'>
          En esta sección, potenciarás la administración de tus finanzas. Te
          ofrecemos una visión clara de tus movimientos de dinero durante los
          últimos 6 meses, desglosando ingresos y gastos mes a mes. ¡Tu control
          financiero, llevado al siguiente nivel!
        </Typography>
      </Box>
    </Box>
  );
}

export default HeaderStatics;
