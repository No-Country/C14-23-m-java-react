import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function SavingsManager(props) {
  const [savings, setSavings] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddClick = () => {
    const inputValueAsNumber = parseFloat(inputValue);
    if (!isNaN(inputValueAsNumber)) {
      setSavings(savings + inputValueAsNumber);
      setInputValue('');
    }
  };

  const handleResetClick = () => {
    setSavings(0);
    setInputValue('');
  };

  return (
    <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          width: isSmallScreen ? '90%' : '45%',
          margin: '2rem',
        }}
      >
        <Typography variant="h4">Gestiona tus ahorros</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginTop: '2%',
          }}
        >
          <Typography>
            Decide cuánto agregar a tus ahorros, y si deseas comenzar de nuevo,
            un solo clic puede poner tus metas en blanco.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            <TextField
              value={inputValue}
              type="number"
              onChange={handleInputChange}
              InputProps={{
                inputProps: {
                  inputMode: 'none',
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor : '#00796B',
                '&:hover': {
                  backgroundColor: 'white',
                  border: '1px solid #00796B',
                  color: '#00796B',
                },
                margin: '0.5rem',
              }}
              onClick={handleAddClick}
            >
              Agregar
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<RefreshIcon />}
              sx={{
                '&:hover': {
                  backgroundColor: 'white',
                  border: '1px solid red',
                  color: 'red',
                },
                margin: '0.5rem',
              }}
              onClick={handleResetClick}
            >
              Restablecer
            </Button>
          </Box>
        </Box>
      </Paper>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          width: isSmallScreen ? '90%' : '45%',
          margin: '2rem',
          justifyContent:'center'
        }}
      >
        <Typography variant="h5">Este mes has decidido ahorrar:</Typography>
        <Typography variant="h4">{`$${savings.toFixed(2)}`}</Typography>
      </Paper>
    </Box>
  );
}

export default SavingsManager;
