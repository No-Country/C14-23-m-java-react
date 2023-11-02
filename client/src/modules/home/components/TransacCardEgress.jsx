import React from 'react';
import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';

import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import WcIcon from '@mui/icons-material/Wc';
import FlightIcon from '@mui/icons-material/Flight';
import HelpOutLineIcon from '@mui/icons-material/HelpOutline';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import Info from '@mui/icons-material/Info';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';
import { NumericFormat } from 'react-number-format';

function TransacCardEgress({
  categoryName,
  amount,
  date,
  setLastFiveEgress,
  info,
  setInfoCard,
}) {
  const iconsByTitle = {
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
    OTROS: <HelpOutLineIcon />,
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
      padding: '2%',

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
      flexDirection: 'row',
    },
    amount: {
      fontWeight: 'bold',
      flex: '0 0 30%',
      color: 'white',
      marginRight: '1rem',
      display: 'flex',
    },
  };

  const handlerBtn = (e) => {
    e.preventDefault();
    setLastFiveEgress(false);
    setInfoCard(info);
  };
  return (
    <Box sx={styles.container}>
      <Box sx={styles.infoContainer}>
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
          {' '}
          {icon}
        </Typography>

        <Typography
          sx={{
            color: 'white',
            marginLeft: '1rem',
            '@media (max-width: 400px)': {
              fontSize: '8px',
            },
            '@media (max-width: 470px)': {
              fontSize: '12px',
            },
            '@media (max-width: 570px)': {
              fontSize: '13px',
            },
            '@media (max-width: 1600px)': {
              fontSize: '10px',
            },'@media (max-width: 1800px)': {
              fontSize: '12px',
            },'@media (max-width: 1380px)': {
              fontSize: '10px',
            },
          }}
        >
          {separateWord(categoryName)}
        </Typography>
      </Box>
      <Box variant='h6' sx={styles.amount}>
        <NumericFormat
          value={amount}
          thousandSeparator=','
          displayType='text'
          decimalScale={2}
          fixedDecimalScale={true}
          prefix='$'
          renderText={(value) => (
            <Typography
              sx={{
                '@media (max-width: 400px)': {
                  fontSize: '8px',
                },
                '@media (max-width: 470px)': {
                  fontSize: '12px',
                },
                '@media (max-width: 570px)': {
                  fontSize: '13px',
                },
                '@media (max-width: 1600px)': {
                  fontSize: '10px',
                },'@media (max-width: 1800px)': {
                  fontSize: '12px',
                },'@media (max-width: 1380px)': {
                  fontSize: '10px',
                },
              }}
              variant='h6'
            >
              {value}
            </Typography>
          )}
        />

        <Button
          variant='contained'
          onClick={(e) => handlerBtn(e)}
          sx={{
            background: '#0a574e',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '1.5rem',
            marginLeft: '1rem',

            '&:hover': { background: '#006666' },
          }}
        >
          <Info color='white' />
        </Button>
      </Box>
    </Box>
  );
}

export default TransacCardEgress;
