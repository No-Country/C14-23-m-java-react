import React from 'react';
import EgressDetails from './components/EgressDetails';
import IncomeDetails from './components/IncomeDetails';
import { Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import womenPayment from '../../assets/LottiesAnimations/womenPayment.json';


function HistoryContainer(props) {

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    // Establece flexDirection como "column" en pantallas pequeñas
    '@media (max-width: 767px)': {
      flexDirection: 'column',
    },
  };

  const detailsStyle = {
    flex: '1',
  };

  const animationStyle = {
    display: 'flex',
    height: '30rem',
    flex: '1',
    alingItems: 'center',
    justifyContent: 'center',

    '@media (max-width: 767px)': {
      height: '15rem',
      marginTop: '10rem'
    },
  };

  return (
    <>
     
      <Box display={'flex'}>
        <Box display={'flex'} flex={1} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
          <Typography variant='h5' margin={'1rem'} >Historial de transacciones</Typography>

          <Typography textAlign={'justify'} margin={'1rem'} >
          
            En esta sección, encontrarás un registro detallado de todas tus
            transacciones. Cada entrada incluye la hora, el monto, el día, el
            mes y el año de la transacción. Además, se especifica si se trata de
            un ingreso o un egreso. Este historial te proporciona un resumen
            completo de tus actividades financieras, lo que facilita el
            seguimiento de tus movimientos y decisiones financieras.{' '}
          </Typography>
        </Box>

        <Box sx={animationStyle}>
          <Lottie animationData={womenPayment} />
        </Box>
      </Box>

      <Box sx={containerStyle}>
        <Box sx={detailsStyle}>
          <IncomeDetails />
        </Box>

        <Box sx={detailsStyle}>
          <EgressDetails />
        </Box>
      </Box>
    </>
  );
}

export default HistoryContainer;
