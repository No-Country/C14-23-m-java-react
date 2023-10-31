import React from 'react';
import { Box, Paper, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightIcon from '@mui/icons-material/Flight';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import WcIcon from '@mui/icons-material/Wc';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HelpOutLineIcon from '@mui/icons-material/HelpOutline';

import { NumericFormat } from 'react-number-format';

function CardExpenses({
  delExpenses,
  categoryName,
  amount,
  description,
  date,
  id,
}) {
  const formatDate = date.join('/');
  //funcion para separa palabras

  const stylesIcon = {
    display: 'flex',
    fontSize: 49,
    color: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const iconsByTitle = {
    OTROS: <HelpOutLineIcon sx={stylesIcon} />,
    SUELDO: <MonetizationOnIcon sx={stylesIcon} />,
    OTROS: <HelpOutLineIcon sx={stylesIcon} />,
    SUELDO_MENSUAL: <MonetizationOnIcon sx={stylesIcon} />,
    PRESTAMO: <AccountBalanceIcon sx={stylesIcon} />,
    CLIENTES: <AccountCircleIcon sx={stylesIcon} />,
    BONO_EXTRA: <AttachMoneyIcon sx={stylesIcon} />,
    ALIMENTACION: <FastfoodIcon />,
    ALIMENTACION: <FastfoodIcon sx={stylesIcon} />,
    VIVIENDA: <HomeIcon sx={stylesIcon} />,
    TRANSPORTE: <CommuteIcon sx={stylesIcon} />,
    ENTRETENIMIENTO: <TheaterComedyIcon sx={stylesIcon} />,
    SALUD_CUIDADO_PERSONAL: <LocalHospitalIcon sx={stylesIcon} />,
    EDUCACION: <SchoolIcon sx={stylesIcon} />,
    VESTIMENTA: <WcIcon sx={stylesIcon} />,
    SERVICIOS: <ReceiptIcon sx={stylesIcon} />,
    AHORRO_INVERSION: <SavingsIcon sx={stylesIcon} />,
    VIAJE_VACACIONES: <FlightIcon sx={stylesIcon} />,
  };
  const icon = iconsByTitle[categoryName];

  const styles = {
    paper: {
      display: 'flex',
      flexDirection: 'row', // Cambia la dirección a horizontal
      margin: '1rem',
      width: '40vw',
      border: '1px solid red',
      padding: '1rem',
      height: '17%',
      justifyContent: 'center',
      '@media (max-width: 899px)': {
        width: '80vw',
      },'@media (max-width: 1366px)': {
        width:'45vw',
     },'@media (max-width: 500px)':{
      width: '85vw'
     },'@media (max-width: 390px)':{
      marginLeft: '2rem'
     }
      
    },
    button: {
      background: 'transparent', // Fondo transparente
      border: 'none',
      cursor: 'pointer',
     
      '&:hover': {
        color: 'red', // Cambia el color al hacer hover
      }, justifyContent: 'center',
      '@media (max-width: 899px)': {
         marginLeft: '-1rem',
      },
      '@media (min-width: 750px)': {
         marginLeft: '-4rem',
      },'@media (min-width: 899px)': {
        marginLeft: '-2rem',
     },'@media (min-width: 1366px)': {
      marginLeft: '-5rem',
   },
     
      
    },
    contBtnIcon: {
      display: 'flex',
      alignItems: 'center', // Centra verticalmente
      flexDirection: 'column',
    },
    contBtn: {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-start',
      marginBottom: '-1rem',
      marginLeft: '-2rem',
      
    },
    contInfo: {},
  };
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

  return (
    <Paper sx={styles.paper}>
      <Box sx={styles.contBtnIcon}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80%',
            marginRight: '1rem',
          }}
        >
          <Box
            sx={{
              flex: 'none !important',
              border: '6px solid red',
              borderRadius: '50%',
            }}
          >
            {icon}
          </Box>
        </Box>
        <Box sx={styles.contBtn}>
          <Button onClick={() => delExpenses(id)}>
            {' '}
            <IconButton sx={styles.button}>
              <DeleteIcon />
            </IconButton>
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
        <Box
          sx={{
            display: 'flex',
            borderBottom: 'solid 2px red',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ display: 'flex', flex: 1, fontWeight: 'bold', fontSize: '-1rem' }} >
            {separateWord(categoryName)}
          </Typography>{' '}
          <NumericFormat
            value={amount}
            thousandSeparator=','
            displayType='text'
            decimalScale={2}
            fixedDecimalScale={true}
            prefix='$'
            renderText={(value) => (
              <Typography sx={{fontWeight:'bold'}} >{`-${value}`}</Typography>
            )}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            sx={{ marginTop: '1rem', fontWeight: 'bold' }}
          >{`Fecha: ${formatDate}`}</Typography>
          <Box>
            <Typography>Descripcion: </Typography>
            <Typography
              variant='body2'
              sx={{
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                textAlign: 'justify',
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default CardExpenses;
