import { Button, CircularProgress, Grid, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CardInfoAditional from './CardInfoAditional';
import 'animate.css';
import InfoIcon from '@mui/icons-material/Info'; // Icono de información
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
  const [viewInfo, setViewInfo] = useState(true);

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
      color: '#e35db6',
    },
    {
      color: '#3e5eb0',
    },
    {
      color: '#216e27',
    },
    {
      color: '#c4b24d',
    },
    {
      color: ' #9749c4',
    },
    {
      color: '#b06c38',
    },
    {
      color: ' #47baba',
    },
    {
      color: '#4bbd6d',
    },
    {
      color: ' #7666d4',
    },
    {
      color: ' #858282',
    },
    {
      color: '#a13232',
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
        borderColor: 'black',
        borderWidth: 2,
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
    <Paper
      sx={{
        my: 2,
        width: '80%',
        p: 2,
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
        },
        '@media (max-width: 400px)': {
          display: 'flex',

          width: '85vw',
          marginLeft: '1.8rem',
        },
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          height: '100%',
          borderRadius: '2%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item xs={11}>
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
            Añadir Gasto
          </Button>
        </Grid>

        <Grid item xs={1}>
          <IconButton color='primary' onClick={() => setViewInfo(false)}>
            <InfoIcon />
          </IconButton>
        </Grid>

        <Grid
          item
          container
          xs={12}
          spacing={1}
          sx={{ display: 'flex', height: '60vh' }}
        >
          {viewInfo ? (
            <Grid item xs={12} maxHeight={'100%'}>
              <Pie
                data={data}
                options={{
                  plugins: {
                    legend: { display: true, position: 'bottom' },
                  },
                }}
              />
            </Grid>
          ) : (
            <Grid
              className='animate__animated  animate__backInDown'
              item
              xs={12}
            >
              <CardInfoAditional
                text={
                  'Este gráfico muestra cómo se compone tu Total de Gastos indicando el porcentaje que representa cada categoría dentro del mismo. Además, en la sección inferior puedes hacer clic en los rectángulos correspondientes a las categorías cuyo porcentaje no quieras visualizar en el gráfico.'
                }
                setView={setViewInfo}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TotalAmountHome
              text={'Total de Gastos'}
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
