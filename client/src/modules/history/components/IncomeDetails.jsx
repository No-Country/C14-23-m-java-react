import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  IconButton,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  AlertTitle,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { useIncome } from '../../../context/IncomeContext';
import CardIncomes from './CardIncomes';
import FilterComponent from './FilterComponent';
import { incomeCategories } from '../../../helpers/incomeCategory';
import { NumericFormat } from 'react-number-format';

function IncomeDetails() {
  const [isHovered, setIsHovered] = useState(false);
  const [incomes, setIncomes] = useState([]);
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

  const { delIncome, allFilteredIncomes } = useIncome(); // uso el contexto

  useEffect(() => {
    async function getFilteredData() {
      setError(false);
      setLoading(true);
      const res = await allFilteredIncomes(1, {
        categoryId: filters.categoryId === 'all' ? null : filters.categoryId,
        month: filters.month === 'all' ? null : filters.month,
      });

      if (res.status === 200) {
        setIncomes(res.data);
      } else {
        setError(true);
      }
      setLoading(false);
    }
    getFilteredData();
  }, [filters, allFilteredIncomes]);

  const handleDeleteIncome = async (id) => {
    setDelResponse({ loading: true, error: false });

    const res = await delIncome(id);
    if (res.status === 200) {
      const newData = incomes.filter((income) => income.idIncome !== id);
      setIncomes(newData);
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
      boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
    },
  };

  const totalAmountIncomes = incomes.reduce(
    (acc, income) => acc + income.amount,
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
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
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
            : 'Se eliminó un ingreso'}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          width: '100%',
          '@media (max-width: 400px)': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        }}
      >
        <Box>
          <Typography
            variant='h5'
            display={'flex'}
            justifyContent={'center'}
            mb={3}
          >
            Tus Ingresos
          </Typography>
          <FilterComponent
            categories={incomeCategories}
            filters={filters}
            handleFilters={handleFilters}
          />

          <Box mt={2}>
            <NumericFormat
              value={totalAmountIncomes}
              thousandSeparator=','
              displayType='text'
              decimalScale={2}
              fixedDecimalScale={true}
              prefix='$'
              renderText={(value) => (
                <Typography textAlign={'center'} color='#267D39' variant='h6'>
                  Ingreso Total: {value}
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
          ) : incomes.length < 1 ? (
            <Box mt={3}>
              <em>No hay ingresos</em>
            </Box>
          ) : (
            incomes.map((income, index) => {
              return (
                <CardIncomes
                  key={index}
                  id={income.idIncome}
                  delIncome={handleDeleteIncome}
                  date={income.date}
                  amount={income.amount}
                  categoryName={income.categoryName}
                  description={income.description}
                />
              );
            })
          )}
        </List>
      </Box>
    </Paper>
  );
}

export default IncomeDetails;
