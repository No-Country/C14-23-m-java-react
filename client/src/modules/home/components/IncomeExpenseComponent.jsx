import { Button, CircularProgress, Grid, Paper } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings'; // Icono de configuración
import InfoIcon from '@mui/icons-material/Info'; // Icono de información
import TotalAmountHome from './TotalAmountHome';
import { PropTypes } from 'prop-types';
import CardInfoAditional from './CardInfoAditional';
import 'animate.css';

import { useIncome } from '../../../context/IncomeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseByCategory = ({ handleOpen }) => {
  ExpenseByCategory.propTypes = {
    handleOpen: PropTypes.func.isRequired,
  };

  const { allIncomes, newIncome } = useIncome();

  const [incomes, setIncomes] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [viewInfo, setViewInfo] = useState(true);

  useEffect(() => {
    const getIncomes = async () => {
      try {
        const res = await allIncomes();
        setIncomes(res);

        // Extraer las categorías únicas de los gastos
        const uniqueCategories = [
          ...new Set(res.map((expense) => expense.categoryName)),
        ];

        // Crear un arreglo de objetos para las categorías
        const categories = uniqueCategories.map((category) => ({
          label: category,
        }));

        setIncomeCategories(categories);
        setLoading(false); // Cambia el estado de carga a falso una vez que los datos están disponibles
      } catch (error) {
        console.error('Error al cargar los datos de gastos:', error);
        setLoading(false); // Asegúrate de manejar cualquier error
      }
    };

    getIncomes();
  }, [newIncome]);

  // Calcula el total de gastos
  const totalGastos = incomes.reduce((acc, item) => acc + item.amount, 0);

  const calculatePorcentajes = () => {
    const porcentajes = [];

    // Calcular el total de gastos
    const totalGastos = incomes.reduce((acc, item) => acc + item.amount, 0);

    // Recorre las categorías únicas
    incomeCategories.forEach((category) => {
      // Filtra los gastos correspondientes a la categoría
      const gastosCategoria = incomes.filter(
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
    return incomeCategories.map((category) => category.label);
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
  }, [incomeCategories]);

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
  }, [totalGastos, newIncome]);

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
        marginLeft: '2rem',
        height: '70vh',

        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
        },
        '@media (max-width: 400px)': {
          display: 'flex',

          width: '85vw',
          marginLeft: '1.8rem',
        },
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={11}>
          <Button
            onClick={() => handleOpen('INGRESO')}
            type='button'
            fullWidth
            variant='contained'
            sx={{
              mb: 2,
              bgcolor: '#00796B',
              '&:hover': { bgcolor: '#006B5B' },
            }}
          >
            Añadir Ingreso
          </Button>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            variant='contained'
            color='primary'
            onClick={() => setViewInfo(false)}
          >
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
            <Grid item xs={12}>
              <Pie
                data={data}
                options={{
                  plugins: { legend: { display: true, position: 'bottom' } },
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
                  'Estás viendo un  gráfico de tarta que representa el porcentaje de ingresos que has tenido en los últimos 6 meses. Cada ingreso se agrupa en categorías, y los segmentos del gráfico se basan en estas categorías y en la cantidad de ingresos acumulados en cada una. Además, si seleccionas una categoría específica, se eliminará de los cálculos, lo que significa que el gráfico no la tendrá en cuenta al realizar sus totales.'
                }
                setView={setViewInfo}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TotalAmountHome
              text={'Total Ingresos'}
              total={totalGastos}
              color={'green'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ExpenseByCategory;
