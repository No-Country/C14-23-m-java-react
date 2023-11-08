import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import SavingsTotal from './components/SavingsTotal';
import BalanceInfo from './components/BalanceInfo';
import Cookies from 'js-cookie';

const HomeContainer = () => {
  const [modal, setModal] = useState(false);
  const [type, setType] = useState('');
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const { userData } = useUser();

  useEffect(() => {
    if (!userData) {
      Cookies.remove('token');
      navigate('/login');
    }
  }, [userData]);

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

  return (
    <Box
      component='main'
      sx={{
        width: 'calc(100vw)',
        margin: 0,

        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
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
          paddingTop: '1rem',
          display: 'flex',
          width: '100vw',
          justifyContent: 'space-around',
          // paddingTop: '1rem'
        }}
      >
        {userData ? (
          <Box
            sx={{
              width: '47.5vw',
              // paddingTop: '1rem',
            }}
          >
            <BalanceInfo
              totalBalance={userData.totalIncome}
              availableBalance={
                userData.totalIncome - userData.accumulatedSavings
              }
            />
          </Box>
        ) : (
          <CircularProgress color='inherit' />
        )}

        {userData ? (
          <Box
            sx={{
              width: '47.5vw',
              // paddingTop: '1rem',
            }}
          >
            <SavingsTotal totalSavings={userData.accumulatedSavings} />
          </Box>
        ) : (
          <CircularProgress color='inherit' />
        )}
      </Box>

      <Grid container spacing={2} sx={{ minHeight: '100%' }}>
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
            color={error ? 'error' : type === 'GASTO' ? 'info' : 'success'}
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
              ? 'Ocurrió un error, intente más tarde'
              : type === 'GASTO'
              ? 'Tu gasto se registró con éxito!'
              : 'Tu ingreso se registró con éxito!'}
          </Alert>
        </Snackbar>

        <Grid
          item
          container
          xs={12}
          lg={8}
          alignItems='center'
          sx={{
            mt: '-2rem',
            '@media (max-width: 700px)': {
              mt: '-3rem',
            },
          }}
        >
          <Grid
            item
            container
            xs={12}
            lg={6}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <IncomeExpenseComponent handleOpen={handleOpen} />
          </Grid>

          <Grid
            item
            container
            xs={12}
            lg={6}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ExpenseByCategory handleOpen={handleOpen} />
          </Grid>
        </Grid>
        <Grid
          sx={{
            minHeight: '100vh',
            mt: '-2rem',
            '@media (max-width: 700px)': {
              mt: '0',
            },
          }}
          item
          container
          xs={12}
          lg={4}
        >
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeContainer;
