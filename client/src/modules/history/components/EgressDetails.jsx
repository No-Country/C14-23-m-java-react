import { useEffect, useState } from 'react';

import {
  Box,
  Paper,
  Typography,
  List,
  CircularProgress,
  Alert,
  AlertTitle,
  Backdrop,
  Snackbar,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEgress } from '../../../context/EgressContext';
import CardExpenses from './CardExpenses';
import FilterComponent from './FilterComponent';
import { expenseCategories } from '../../../helpers/egressCategory';
import { NumericFormat } from 'react-number-format';

function EgressDetails() {
  const [isHovered, setIsHovered] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [delResponse, setDelResponse] = useState({
    loading: false,
    error: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({ categoryId: 'all', month: 'all' });

  const [alert, setAlert] = useState(false);

  const handleCloseAlert = () => setAlert(false);
  const handleOpenAlert = () => setAlert(true);

  const handleFilters = async (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const { delExpense, allFilteredExpenses } = useEgress(); // uso el contexto

  useEffect(() => {
    async function getFilteredData() {
      setError(false);
      setLoading(true);
      const res = await allFilteredExpenses(1, {
        categoryId: filters.categoryId === 'all' ? null : filters.categoryId,
        month: filters.month === 'all' ? null : filters.month,
      });

      if (res.status === 200) {
        setExpenses(res.data);
      } else {
        setError(true);
      }
      setLoading(false);
    }
    getFilteredData();
  }, [filters, allFilteredExpenses]);

  const handleDeleteExpense = async (id) => {
    setDelResponse({ loading: true, error: false });

    const res = await delExpense(id);
    if (res.status === 200) {
      const newData = expenses.filter((expense) => expense.idEgress !== id);
      setExpenses(newData);
      setDelResponse({ loading: false, error: false });
    } else {
      setDelResponse({ loading: false, error: true });
    }

    handleOpenAlert();
  };

  const styles = {
    paper: {
      margin: '1rem',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      transition: 'box-shadow 0.3s',
      cursor: 'pointer',
      width: '45vw',
      '@media (max-width: 899px)': {
        width: '90vw',
      },
    },
    paperHover: {
      boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
    },
  };

  const totalAmountExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0,
  );

  return (
    <Paper
      // onMouseOver={() => setIsHovered(true)}
      // onMouseOut={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ ...styles.paper, ...(isHovered && styles.paperHover) }}
    >
      {delResponse.loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}

      <Snackbar
        open={alert}
        onClose={handleCloseAlert}
        autoHideDuration={delResponse.error ? 8000 : 3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={delResponse.error ? 'error' : 'success'}
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
          {delResponse.error
            ? 'Ocurrió un error, intente mas tarde'
            : 'Se eliminó un gasto'}
        </Alert>
      </Snackbar>

      <Box sx={{ width: '100%' }}>
        <Box>
          <Typography
            variant='h5'
            display={'flex'}
            justifyContent={'center'}
            mb={3}
          >
            Tus Gastos
          </Typography>
          <FilterComponent
            categories={expenseCategories}
            filters={filters}
            handleFilters={handleFilters}
          />

          <Box mt={2}>
            <NumericFormat
              value={totalAmountExpenses}
              thousandSeparator=','
              displayType='text'
              decimalScale={2}
              fixedDecimalScale={true}
              prefix='$'
              renderText={(value) => (
                <Typography textAlign={'center'} color='error' variant='h6'>
                  Gasto Total: {value}
                </Typography>
              )}
            />
          </Box>
        </Box>

        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            '@media (max-width: 599px)': {
              width: '80vw',
            },
          }}
        >
          {loading ? (
            <CircularProgress sx={{ display: 'block', mt: 5, mx: 'auto' }} />
          ) : error ? (
            <Alert severity='error'>
              <AlertTitle>Error</AlertTitle>
              Ocurrió un error intente mas tarde
            </Alert>
          ) : expenses.length < 1 ? (
            <Box mt={3}>
              <em>No hay gastos</em>
            </Box>
          ) : (
            expenses.map((egreso, index) => {
              return (
                <CardExpenses
                  key={index}
                  id={egreso.idEgress}
                  delExpenses={handleDeleteExpense}
                  date={egreso.date}
                  amount={egreso.amount}
                  categoryName={egreso.categoryName}
                  description={egreso.description}
                />
              );
            })
          )}
        </List>
      </Box>
    </Paper>
  );
}

export default EgressDetails;
