import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { Collapse } from '@mui/material';
import {useUser} from '../../../context/UserContext'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

function SavingsManager(props) {
  const [savings, setSavings] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [inputAlert, setInputAlert] = useState(false); // Estado para mostrar alerta si el input excede el total del saldo del usuario
  const [amountSavingAlert, setAmountSavingAlert] = useState(false); // Estado para mostrar alerta si el inputes menor a el total del saldo del usuario pero supera el valor si es sumado
  const [savedSavings, setSavedSavings] = useState(false) // Estado para mostrar un alerta si se guardo con exito un ahorro
  const [infoUser, setInfoUser] = useState(null) // estado que guarda toda la informnacion del usuario
  const [restMoney, setRestMoney] = useState(null)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  
  const{getDataUser} = useUser() //traigo el contexto user

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getDataUser(1);
        setInfoUser(res)
        console.log(infoUser.totalIncome)
        setRestMoney(infoUser.totalIncome?.toFixed(2))
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // Verificar si se debe mostrar la alerta
    const inputValueAsNumber = parseFloat(event.target.value);
    if (inputValueAsNumber > infoUser.totalIncome) {
      setInputAlert(true);
    } else {
      setInputAlert(false);
    }
  };

  const handleAddClick = () => {
    const inputValueAsNumber = parseFloat(inputValue);
    if (!isNaN(inputValueAsNumber)) {
      if (inputValueAsNumber <= restMoney) {
        setSavings(savings + inputValueAsNumber);
        setSavedSavings(true);
        setInputValue('');
        setRestMoney(restMoney - inputValueAsNumber.toFixed(2));
        // Restaurar la alerta después de 3 segundos
        setTimeout(() => {
          setSavedSavings(false);
        }, 3000);
      } else {
        setAmountSavingAlert(true);
      }
    }
  };
  

  const handleResetClick = () => {
    setSavings(0);
    setInputValue('');
  };

  return (
    <Box display='flex' flexDirection={isSmallScreen ? 'column' : 'row'}>
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
        <Typography variant='h4'>Gestiona tus ahorros</Typography>
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
              type='number'
              onChange={handleInputChange}
              InputProps={{
                inputProps: {
                  inputMode: 'none',
                },
              }}
            />

             {/* alertas para el formulario */}
            {inputAlert && (
              <Alert
                severity='error'
                
              >
                El monto no puede ser mayor que 20,000
              </Alert>
            )}

            <Collapse in={amountSavingAlert}>
              <Alert
                severity='error'
                onClose={() => setAmountSavingAlert(false)}
              >
                el monto que quieres ingresar mas lo que ya tenias guardado
                superan tu saldo
              </Alert>
            </Collapse>

            <Collapse in={savedSavings}>
              <Alert
                severity='success'
                onClose={() => setSavedSavings(false)}
              >
                Se ha establecido tu meta de ahorro mensual
              </Alert>
            </Collapse>

             {/* fin  alertas para el formulario */}

            <Button
              variant='contained'
              color='primary'
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: '#00796B',
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
              variant='contained'
              color='error'
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
          justifyContent: 'center',
        }}
      >
        <AccountBalanceIcon sx={{ fontSize: 64, color: '#00796B' }} />
        <Typography variant="h5" sx={{ marginTop: '1rem' }}>
          Este mes has decidido ahorrar:
        </Typography>
        <Typography variant="h4">
          <span style={{ color: '#00796B' }}>
            {`$${savings.toFixed(2)}`}
          </span>
        </Typography>
        <Typography variant="h6" sx={{ marginTop: '2rem' }}>
          Saldo disponible: <span style={{ color: '#00796B' }}>{`$${restMoney}`}</span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default SavingsManager;
