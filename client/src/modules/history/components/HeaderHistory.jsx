import React from 'react';
import Lottie from 'lottie-react';
import womenPayment from '../../../assets/LottiesAnimations/womenPayment.json'
import { Box, Typography } from '@mui/material';

function HeaderHistory() {
  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems='center'
      padding='1rem'
      bgcolor='#dcdcdc'
    >
      <Box flex={{ xs: 'none', sm: '1' }} maxWidth={{ lg: '14%' }}>
        <Lottie animationData={womenPayment} />
      </Box>
      <Box flex='1'>
        <Typography variant='h5' margin='1rem'>
        Historial de transacciones
        </Typography>
        <Typography textAlign='justify' margin='1rem'>
          En esta sección, encontrarás un registro detallado de todas tus
          transacciones. Cada entrada incluye la hora, el monto, el día, el mes
          y el año de la transacción. Además, se especifica si se trata de un
          ingreso o un egreso. Este historial te proporciona un resumen completo
          de tus actividades financieras, lo que facilita el seguimiento de tus
          movimientos y decisiones financieras.{' '}
        </Typography>
      </Box>
    </Box>
  );
}

export default HeaderHistory;
