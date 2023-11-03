import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import Box from '@mui/material/Box';
import { NumericFormat } from 'react-number-format';

const SavingsTotal = ({ totalSavings }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

        width: '100%',
        // marginTop: '80px',
        height: '60%',

        '@media (max-width: 700px)': {
          flexDirection: 'column',
          width: '90%', // Ajusta el ancho en pantallas pequeñas
          alignItems: 'center',
        },
      }}
    >
      <Box>
        <Box
          display='flex'
          alignItems='center'
          sx={{
            flexDirection: 'row',
            '@media (max-width: 700px)': {
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        >
          <AssuredWorkloadIcon
            sx={{
              fontSize: 48,
              color: '#00796B',
              marginRight: 2,
              '@media (max-width: 700px)': {
                fontSize: 20,
              },
            }}
          />
          <Typography
            sx={{
              fontWeight: 'bold',
              '@media (max-width: 700px)': {
                fontSize: '15px',
              },
            }}
          >
            Total de Ahorros
          </Typography>
        </Box>
        <NumericFormat
          value={totalSavings}
          thousandSeparator=','
          displayType='text'
          decimalScale={2}
          fixedDecimalScale={true}
          prefix='$'
          renderText={(value) => (
            <Typography
              color='green'
              fontWeight={'bold'}
              sx={{
                '@media (max-width: 700px)': {
                  fontSize: '15px',
                },
              }}
            >
              {value}
            </Typography>
          )}
        />
      </Box>
      <Link to={'/savings'}>
        <Button
          variant='contained'
          startIcon={<EditIcon />}
          sx={{
            bgcolor: '#00796B',
            border: '1px solid #00796B',
            '&:hover': {
              bgcolor: 'white',
              border: '1px solid #00796B',
              color: '#00796B',
            },
          }}
          className='small-button'
        >
          Editar
        </Button>
      </Link>
    </Paper>
  );
};

export default SavingsTotal;
