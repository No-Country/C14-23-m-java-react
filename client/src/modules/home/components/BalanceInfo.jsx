import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';

const BalanceInfo = ({ availableBalance, totalBalance }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '49%',
      }}
    >
      <Box display='flex' alignItems='center'>
        <CheckCircleIcon
          sx={{ fontSize: 48, color: 'green', marginRight: 2 }}
        />
        <Typography variant='h6' marginRight={'1rem'}>Saldo Disponible</Typography>
        <Typography variant='h5' color='green'>
          {`$${availableBalance?.toFixed(2)}`}
        </Typography>
      </Box>

      <Box display='flex' alignItems='center'>
        <Typography variant='h6' marginRight={'1rem'}>Saldo Total</Typography>
        <Typography variant='h5' color='green'>
          {`$${totalBalance?.toFixed(2)}`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default BalanceInfo;
