import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IncomeExpenseComponent from './components/IncomeExpenseComponent';
import ExpenseByCategory from './components/ExpenseByCategory';
import RecentActivity from './components/RecentActivity';
import ModalHome from './components/ModalHome';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import SavingsTotal from './components/SavingsTotal';
import BalanceInfo from './components/BalanceInfo';

const HomeContainer = () => {
  const [modal, setModal] = useState(false);
  const [type, setType] = useState('');
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCloseAlert = () => setAlert(false);
  const handleOpenAlert = (error = false) => {
    setAlert(true);
    setError(error);
  };

  const handleOpen = (formType) => {
    setType(formType);
    setModal(true);
  };
  const handleClose = () => setModal(false);

  const { userData } = useUser();

  return (
    <Box
      component='main'
      sx={{ width: '100%', margin: 0, height: 'calc(100vh - 64px)' }}
    >
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}

      <Box
        sx={{
          display: 'flex',
          maxWidth: '100vw',
          justifyContent: 'space-around',
        }}
      >
        {userData ? (
          <BalanceInfo
            totalBalance={userData.totalIncome}
            availableBalance={
              userData.totalIncome - userData.accumulatedSavings
            }
          />
        ) : (
          <CircularProgress color='inherit' />
        )}

        {userData ? (
          <SavingsTotal totalSavings={userData.accumulatedSavings} />
        ) : (
          <CircularProgress color='inherit' />
        )}
      </Box>

      <Grid container spacing={2} sx={{ height: '100%' }}>
        <ModalHome
          open={modal}
          handleClose={handleClose}
          handleOpenAlert={handleOpenAlert}
          formType={type}
          setLoading={setLoading}
        />

        <Snackbar
          open={alert}
          onClose={handleCloseAlert}
          autoHideDuration={error ? 8000 : 3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            variant={error ? 'standard' : 'filled'}
            severity={error ? 'error' : 'success'}
            sx={{
              bgcolor: error
                ? 'error'
                : type === 'GASTO'
                ? '#e35d79'
                : 'success',
            }}
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
            {error
              ? 'Ocurrió un error, intente mas tarde'
              : type === 'GASTO'
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
