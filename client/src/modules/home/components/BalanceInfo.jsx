import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { NumericFormat } from 'react-number-format';

const BalanceInfo = ({ availableBalance, totalBalance }) => {
  const [showAvailable, setShowAvailable] = useState(false);
  const [showTotal, setShowTotal] = useState(false);

  const toggleAvailable = () => {
    setShowAvailable(!showAvailable);
  };

  const toggleTotal = () => {
    setShowTotal(!showTotal);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        py: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '2rem 0',
        height: '60%',

        '@media (min-width: 1700px)': {
          // marginTop: '60px',
        },

        '@media (min-width: 800px)': {
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
        },

        '@media (max-width: 800px)': {
          // marginTop: '100px',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontSize: '16px',
            marginBottom: '0',
            fontWeight: 'bold',
            '@media (max-width: 800px)': {
              fontSize: '12px',
            },
            '@media (min-width: 800px)': {
              fontSize: '18px',
            },
            '@media (min-width: 1600px)': {
              fontSize: '16px',
            },
          }}
        >
          Saldo Disponible
        </Typography>
        {showAvailable ? (
          <NumericFormat
            value={availableBalance}
            thousandSeparator=','
            displayType='text'
            decimalScale={2}
            fixedDecimalScale={true}
            prefix='$'
            renderText={(value) => (
              <Typography
                color='green'
                variant='h5'
                sx={{
                  fontSize: '24px',
                  marginBottom: '0',
                  '@media (max-width: 800px)': {
                    fontSize: '12px',
                  },
                  '@media (min-width: 800px)': {
                    fontSize: '18px',
                  },
                  '@media (min-width: 1600px)': {
                    fontSize: '26px',
                  },
                }}
              >
                {value}
              </Typography>
            )}
          />
        ) : (
          <Typography
            color='green'
            variant='h5'
            sx={{
              fontSize: '24px',
              marginBottom: '0',
              '@media (max-width: 800px)': {
                fontSize: '12px',
              },
              '@media (min-width: 800px)': {
                fontSize: '18px',
              },
              '@media (min-width: 1600px)': {
                fontSize: '26px',
              },
            }}
          >
            ********
          </Typography>
        )}
        <button
          onClick={toggleAvailable}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            margin: 0,
          }}
        >
          {showAvailable ? (
            <VisibilityOffIcon sx={{ fontSize: '24px' }} />
          ) : (
            <VisibilityIcon sx={{ fontSize: '24px' }} />
          )}
        </button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%', // Ocupa el 50% del ancho
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontSize: '16px',
            marginBottom: '0',
            fontWeight: 'bold',
            '@media (max-width: 800px)': {
              fontSize: '12px',
            },
            '@media (min-width: 800px)': {
              fontSize: '18px',
            },
            '@media (min-width: 1600px)': {
              fontSize: '16px',
            },
          }}
        >
          Saldo Total
        </Typography>
        {showTotal ? (
          <NumericFormat
            value={totalBalance}
            thousandSeparator=','
            displayType='text'
            decimalScale={2}
            fixedDecimalScale={true}
            prefix='$'
            renderText={(value) => (
              <Typography
                color='green'
                variant='h5'
                sx={{
                  fontSize: '24px',
                  marginBottom: '0',
                  '@media (max-width: 800px)': {
                    fontSize: '12px',
                  },
                  '@media (min-width: 800px)': {
                    fontSize: '18px',
                  },
                  '@media (min-width: 1600px)': {
                    fontSize: '26px',
                  },
                }}
              >
                {value}
              </Typography>
            )}
          />
        ) : (
          <Typography
            color='green'
            variant='h5'
            sx={{
              fontSize: '24px',
              marginBottom: '0',
              '@media (max-width: 800px)': {
                fontSize: '12px',
              },
              '@media (min-width: 800px)': {
                fontSize: '18px',
              },
              '@media (min-width: 1600px)': {
                fontSize: '26px',
              },
            }}
          >
            ********
          </Typography>
        )}
        <button
          onClick={toggleTotal}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            margin: 0,
          }}
        >
          {showTotal ? (
            <VisibilityOffIcon sx={{ fontSize: '24px' }} />
          ) : (
            <VisibilityIcon sx={{ fontSize: '24px' }} />
          )}
        </button>
      </Box>
    </Paper>
  );
};

export default BalanceInfo;
