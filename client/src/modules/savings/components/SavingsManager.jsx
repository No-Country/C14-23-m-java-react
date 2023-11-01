import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { useUser } from '../../../context/UserContext';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { NumericFormat } from 'react-number-format';
import { FormProvider, useForm } from 'react-hook-form';
import AmountInput from '../../home/components/AmountInput';
import { Backdrop, CircularProgress, IconButton, Popover } from '@mui/material';

function SavingsManager() {
  const [loading, setLoading] = useState(false);
  const [addAlert, setAddAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [error, setError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseAddAlert = () => setAddAlert(false);
  const handleOpenAddAlert = () => setAddAlert(true);

  const handleCloseDeleteAlert = () => setDeleteAlert(false);
  const handleOpenDeleteAlert = () => setDeleteAlert(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { updateSaving, delSaving, userData } = useUser(); //traigo el contexto user

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const popoverIsOpen = Boolean(anchorEl);
  const id = popoverIsOpen ? 'simple-popover' : undefined;

  const handleConfirmPopover = () => {
    handleResetClick();
    setAnchorEl(null);
  };

  const methods = useForm();

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setError(false);

    const newAmount = (
      userData.accumulatedSavings + parseFloat(data.amount)
    ).toFixed(2);

    const res = await updateSaving(1, newAmount);

    if (res.status === 200) {
      setTimeout(() => reset({ amount: '' }), 0);
      setTimeout(() => handleCloseAddAlert(), 3000);
    } else {
      setError(true);
      setTimeout(() => handleCloseAddAlert(), 8000);
    }

    setLoading(false);
    handleOpenAddAlert();
  });

  const handleResetClick = async () => {
    setError(false);
    setLoading(true);
    const res = await delSaving(1);

    if (res.status === 200) {
      setTimeout(() => handleCloseDeleteAlert(), 3000);
    } else {
      setError(true);
      setTimeout(() => handleCloseDeleteAlert(), 8000);
    }
    setLoading(false);
    handleOpenDeleteAlert();
  };

  return userData ? (
    <Box display='flex' flexDirection={isSmallScreen ? 'column' : 'row'}>
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}

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
          <Typography sx={{ mb: '5%' }}>
            Decide cuánto agregar a tus ahorros, y si deseas comenzar de nuevo,
            un solo clic puede poner tus metas en blanco.
          </Typography>

          <FormProvider {...methods}>
            <Box
              component='form'
              onSubmit={onSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <AmountInput
                name='amount'
                label='Monto de Ahorro'
                validations={{
                  maxValue: (value) =>
                    parseFloat(value) <=
                      userData.totalIncome - userData.accumulatedSavings ||
                    `El monto de ahorro no puede ser mayor al Saldo Disponible.`,
                  accumulatedValue: (value) =>
                    parseFloat(value) + userData.accumulatedSavings <=
                      userData.totalIncome ||
                    `La suma total de ahorro no puede ser mayor al Saldo Disponible.`,
                }}
              />
              {addAlert && (
                <Alert
                  sx={{ my: 2 }}
                  variant={'standard'}
                  severity={error ? 'error' : 'success'}
                  color={error ? 'error' : 'success'}
                  action={
                    <IconButton
                      aria-label='close'
                      color='inherit'
                      size='small'
                      onClick={handleCloseAddAlert}
                    >
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                >
                  {error
                    ? 'Ocurrió un error, intente mas tarde'
                    : 'Ahorro actualizado!'}
                </Alert>
              )}
              <Button
                variant='contained'
                color='primary'
                type='submit'
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: '#00796B',
                  border: '1px solid #00796B',
                  '&:hover': {
                    backgroundColor: 'white',
                    border: '1px solid #00796B',
                    color: '#00796B',
                  },
                  margin: '0.5rem',
                }}
              >
                Agregar
              </Button>
            </Box>
          </FormProvider>
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
        <Popover
          id={id}
          open={popoverIsOpen}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box p={2}>
            <Typography>
              ¿Estás seguro que deseas reiniciar este monto?
            </Typography>
            <Button color='error' onClick={handleClosePopover}>
              Cancelar
            </Button>
            <Button color='success' onClick={handleConfirmPopover}>
              Aceptar
            </Button>
          </Box>
        </Popover>

        <AccountBalanceIcon sx={{ fontSize: 64, color: '#00796B' }} />
        <Typography variant='h5' sx={{ marginTop: '1rem' }}>
          Este mes has decidido ahorrar:
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <NumericFormat
            value={userData.accumulatedSavings}
            thousandSeparator=','
            displayType='text'
            decimalScale={2}
            fixedDecimalScale={true}
            prefix='$'
            renderText={(value) => (
              <Typography
                variant='h4'
                style={{ color: '#00796B', marginRight: 5 }}
              >
                {value}
              </Typography>
            )}
          />

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
            onClick={handleOpenPopover}
            disabled={userData && userData.accumulatedSavings < 0.01}
          >
            Reiniciar Ahorros
          </Button>
        </Box>

        {deleteAlert && (
          <Alert
            sx={{ my: 2 }}
            variant={'standard'}
            severity={error ? 'error' : 'success'}
            color={error ? 'error' : 'success'}
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={handleCloseDeleteAlert}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            {error
              ? 'Ocurrió un error, intente mas tarde'
              : 'Ahorro reiniciado!'}
          </Alert>
        )}

        <NumericFormat
          value={userData.totalIncome - userData.accumulatedSavings}
          thousandSeparator=','
          displayType='text'
          decimalScale={2}
          fixedDecimalScale={true}
          prefix='$'
          renderText={(value) => (
            <Typography variant='h6'>
              Saldo Disponible:{' '}
              <span style={{ color: '#00796B' }}>{value}</span>
            </Typography>
          )}
        />
      </Paper>
    </Box>
  ) : (
    <CircularProgress
      sx={{ display: 'block', mx: 'auto', color: 'inherit', mt: 5 }}
    />
  );
}

export default SavingsManager;
