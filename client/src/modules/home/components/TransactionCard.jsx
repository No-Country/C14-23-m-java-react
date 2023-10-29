import React from 'react';
import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import WcIcon from '@mui/icons-material/Wc';
import FlightIcon from '@mui/icons-material/Flight';
import HelpOutLineIcon from '@mui/icons-material/HelpOutline';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';

function TransactionCard({ categoryName, description, amount, date, setLastFiveIncom }) {
  const iconsByTitle = {
    OTROS: <HelpOutLineIcon />,
    SUELDO_MENSUAL: <MonetizationOnIcon />,
    PRESTAMO: <AccountBalanceIcon />,
    CLIENTES: <AccountCircleIcon />,
    BONO_EXTRA: <AttachMoneyIcon />,
    ALIMENTACION: <FastfoodIcon />,
    VIVIENDA: <HomeIcon />,
    TRANSPORTE: <CommuteIcon />,
    ENTRETENIMIENTO: <TheaterComedyIcon />,
    SALUD_CUIDADO_PERSONAL: <LocalHospitalIcon />,
    EDUCACION: <SchoolIcon />,
    VESTIMENTA: <WcIcon />,
    SERVICIOS: <ReceiptIcon />,
    AHORRO_INVERSION: <SavingsIcon />,
    VIAJE_VACACIONES: <FlightIcon />,
  };
  const icon = iconsByTitle[categoryName];

  //funcion para separa palabras
  const separateWord = (word) => {
    let newWord = '';
    const listSeparate = word.split('_');
    if (listSeparate.length === 2) {
      newWord = listSeparate.join(' ');
      return newWord;
    } else if (listSeparate.length === 1) {
      return word;
    } else {
      const firstPart = listSeparate[0];
      const remainingParts = listSeparate.slice(1);
      newWord = `${firstPart} / ${remainingParts.join(' ')}`;
      return newWord;
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px',
      // border: '1px solid #ccc',
      // borderRadius: '4px',
      borderBottom: '1px solid #ccc',
      height: '18%',
      width: '90%',
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      marginRight: '8px',
    },
    amount: {
      fontWeight: 'bold',
      flex: '0 0 30%',
      color: 'white',
      marginRight: '1rem',
    },
  };

  return (
    <Box sx={styles.container}>
      <div sx={styles.infoContainer}>
        <Typography
          variant='h6'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            color: 'white',
            fontSize: '80%',
          }}
        >
          <Typography sx={{ color: 'white', marginRight: '1rem' }}>
            {icon}
          </Typography>
          {separateWord(categoryName)}
        </Typography>
      </div>

      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {' '}
        <Typography variant='h6' sx={styles.amount}>
          {amount}
        </Typography>
        <Button
          variant='contained'
          onClick={ () => setLastFiveIncom(false)}
          sx={{
            background: '#0a574e',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': { background: '#006666' },
          }}
        >
          <InfoIcon sx={{ color: 'white' }} />{' '}
        </Button>
      </Box>
    </Box>
  );
}

export default TransactionCard;
