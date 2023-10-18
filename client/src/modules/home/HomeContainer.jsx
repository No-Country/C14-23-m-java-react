import { Alert, Box, Grid, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IncomeExpenseComponent from './components/IncomeExpenseComponent';
import ExpenseByCategory from './components/ExpenseByCategory';
import TotalAmountHome from './components/TotalAmountHome';
import RecentActivity from './components/RecentActivity';
import ModalHome from './components/ModalHome';
import { useState } from 'react';

const HomeContainer = () => {
  const [modal, setModal] = useState(false);
  const [type, setType] = useState('');
  const [alert, setAlert] = useState(false);

  const handleCloseAlert = () => setAlert(false);
  const handleOpenAlert = () => setAlert(true);

  const handleOpen = (formType) => {
    setType(formType);
    setModal(true);
  };
  const handleClose = () => setModal(false);

  return (
    <Box
      component='main'
      sx={{ width: '100%', margin: 0, height: 'calc(100vh - 64px)' }}
    >
      <TotalAmountHome
        text={'Saldo disponible'}
        total={10000}
        color={'green'}
      />
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <ModalHome
          open={modal}
          handleClose={handleClose}
          handleOpenAlert={handleOpenAlert}
          formType={type}
        />

        <Snackbar
          open={alert}
          onClose={handleCloseAlert}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            variant='filled'
            color={type === 'GASTO' ? 'error' : 'success'}
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={handleCloseAlert}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            {type === 'GASTO'
              ? 'Tu gasto se registró con éxito!'
              : 'Tu ingreso se registró con éxito!'}
          </Alert>
        </Snackbar>

        <Grid item container xs={8} alignItems='center'>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IncomeExpenseComponent handleOpen={handleOpen} />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ExpenseByCategory handleOpen={handleOpen} />
          </Grid>
        </Grid>
        <Grid item container xs={4}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
};
export default HomeContainer;
