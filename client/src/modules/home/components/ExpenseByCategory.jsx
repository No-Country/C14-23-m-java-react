import { Button, CircularProgress, Grid, Paper } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import TotalAmountHome from './TotalAmountHome';
import { PropTypes } from 'prop-types';
import { useEgress } from '../../../context/EgressContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseByCategory = ({ handleOpen }) => {
  ExpenseByCategory.propTypes = {
    handleOpen: PropTypes.func.isRequired,
  };

  const { allExpenses, newExpense } = useEgress();

  const [expenses, setExpenses] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await allExpenses();
        setExpenses(res);

        // Extraer las categorías únicas de los gastos
        const uniqueCategories = [
          ...new Set(res.map((expense) => expense.categoryName)),
        ];

        // Crear un arreglo de objetos para las categorías
        const categories = uniqueCategories.map((category) => ({
          label: category,
        }));

        setExpenseCategories(categories);
        setLoading(false); // Cambia el estado de carga a falso una vez que los datos están disponibles
      } catch (error) {
        console.error('Error al cargar los datos de gastos:', error);
        setLoading(false); // Asegúrate de manejar cualquier error
      }
    };

    getExpenses();
  }, [newExpense]);

  // Calcula el total de gastos
  const totalGastos = expenses.reduce((acc, item) => acc + item.amount, 0);

  const calculatePorcentajes = () => {
    const porcentajes = [];

    // Calcular el total de gastos
    const totalGastos = expenses.reduce((acc, item) => acc + item.amount, 0);

    // Recorre las categorías únicas
    expenseCategories.forEach((category) => {
      // Filtra los gastos correspondientes a la categoría
      const gastosCategoria = expenses.filter(
        (expense) => expense.categoryName === category.label,
      );

      // Suma los gastos de la categoría
      const totalGastosCategoria = gastosCategoria.reduce(
        (acc, item) => acc + item.amount,
        0,
      );

      // Calcula el porcentaje en función del total de gastos
      const porcentaje = (totalGastosCategoria / totalGastos) * 100;

      // Almacena el porcentaje en el arreglo de porcentajes
      porcentajes.push(porcentaje);
    });

    return porcentajes;
  };

  const colors = [
    {
      color: 'rgba(255, 0, 0)',
    },
    {
      color: 'rgba(0, 255, 0)',
    },
    {
      color: 'rgba(0, 0, 255)',
    },
    {
      color: 'rgba(255, 255, 0)',
    },
    {
      color: 'rgba(128, 0, 128)',
    },
    {
      color: 'rgba(255, 140, 0)',
    },
    {
      color: 'rgba(0, 128, 128)',
    },
    {
      color: 'rgba(128, 128, 0)',
    },
    {
      color: 'rgba(255, 0, 255)',
    },
    {
      color: 'rgba(128, 128, 128)',
    },
  ];

  const categories = () => {
    return expenseCategories.map((category) => category.label);
  };

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: '%',
        data: calculatePorcentajes(),
        backgroundColor: colors.map((color) => color.color),
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      labels: categories(),
    }));
  }, [expenseCategories]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: calculatePorcentajes(),
        },
      ],
    }));
  }, [totalGastos, newExpense]);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper sx={{ my: 2, width: '300px', p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button
            onClick={() => handleOpen('GASTO')}
            type='button'
            fullWidth
            variant='contained'
            sx={{
              mb: 2,
              bgcolor: '#00796B',
              '&:hover': { bgcolor: '#006B5B' },
            }}
          >
            Añadir
          </Button>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12}>
            <Pie
              data={data}
              options={{
                plugins: { legend: { display: true, position: 'bottom' } },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TotalAmountHome
              text={'Total gastos'}
              total={totalGastos}
              color={'red'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ExpenseByCategory;
