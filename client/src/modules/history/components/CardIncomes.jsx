import React from 'react';
import { Box, Paper, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import HelpOutLineIcon from '@mui/icons-material/HelpOutline';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

import { NumericFormat } from 'react-number-format';

function CardIncomes({ delIncome, categoryName, amount, description, date, id }) {
  const formatDate = date.join('/');
  //funcion para separa palabras

  const stylesIcon = {
    display: 'flex',
    fontSize: 48,
    color: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const iconsByTitle = {
    OTROS: <HelpOutLineIcon sx={stylesIcon} />,
    SUELDO_MENSUAL: <MonetizationOnIcon sx={stylesIcon} />,
    PRESTAMO: <AccountBalanceIcon sx={stylesIcon} />,
    CLIENTES: <AccountCircleIcon sx={stylesIcon} />,
    BONO_EXTRA: <AttachMoneyIcon sx={stylesIcon} />,
  };
  const icon = iconsByTitle[categoryName];

  const styles = {
    paper: {
        display: 'flex',
        flexDirection: 'row', // Cambia la dirección a horizontal
        margin: '1rem',
        width: '40vw',
        border: '1px solid green',
        padding: '1rem',
        height: '17%',
        justifyContent: 'center'
      
    },
    button: {
      background: 'transparent', // Fondo transparente
      border: 'none',
      cursor: 'pointer',
      '&:hover': {
        color: 'red', // Cambia el color al hacer hover
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
      marginTop: '-1rem',
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
        <Box sx={styles.contBtn}>
          <Button onClick={() => delIncome(id)}>
            {' '}
            <IconButton sx={styles.button}><DeleteIcon /></IconButton>
          </Button>
        </Box>
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
              border: '6px solid green',
              borderRadius: '50%',
            }}
          >
            {icon}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            borderBottom: 'solid 2px green',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ display: 'flex', flex: 1 }} variant='h6'>
            {separateWord(categoryName)}
          </Typography>
       
            {' '}
            <NumericFormat
              value={amount}
              thousandSeparator=','
              displayType='text'
              decimalScale={2}
              fixedDecimalScale={true}
              prefix='$'
              renderText={(value) => (
                <Typography variant='h6'>{value}</Typography>
              )}
            />
         
        </Box>

        <Box
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '80%' }}
        >
          <Typography
            sx={{ marginTop: '1rem', fontWeight: 'bold' }}
          >{`Fecha: ${formatDate}`}</Typography>
          <Box>
            <Typography>Descripcion: </Typography>
            <Typography>{description}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default CardIncomes;
