import React from 'react';
import { Box, Typography } from '@mui/material';

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


function TransactionCard({ categoryName, description, amount, date }) {

 

  

  const iconsByTitle = {
    OTROS: < HelpOutLineIcon />,
    SUELDO: <MonetizationOnIcon />,
    PRESTAMO: <AccountBalanceIcon />,
    CLIENTES: <AccountCircleIcon />,
    BONO_EXTRA: <AttachMoneyIcon />,
    ALIMENTACION: <FastfoodIcon />,
    VIVIENDA: <HomeIcon />,
    TRANSPORTE: <CommuteIcon />,
    ENTRETENIMIENTO: <TheaterComedyIcon/>,
    SALUD: <LocalHospitalIcon />,
    EDUCACION: <SchoolIcon />,
    VESTIMENTA: <WcIcon />,
    SERVICIOS: <ReceiptIcon />,
    AHORRO_INVERSION: <SavingsIcon />,
    VIAJE_VACACIONES: <FlightIcon />,
  };
  const icon = iconsByTitle[categoryName];



  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
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
    },
  };

  return (
    <Box sx={styles.container}>
      <div sx={styles.infoContainer}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <Typography sx={{ color: '#fff', marginRight: '1rem' }}>
            {' '}
            {icon}
          </Typography>
          {categoryName}
        </Typography>
        <Typography variant='body1' >
          {description}
          <Typography variant='caption' color='textSecondary' sx={{marginLeft : '1rem'}}>
            {date}
          </Typography>
        </Typography>
      </div>
      <Typography variant='h6' sx={styles.amount}>
        {amount}
      </Typography>
    </Box>
  );
}

export default TransactionCard;
