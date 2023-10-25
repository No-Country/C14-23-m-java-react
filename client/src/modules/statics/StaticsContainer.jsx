import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEgress } from '../../context/EgressContext';
import { useIncome } from '../../context/IncomeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Gastos por Mes',
    },
  },
};

const StaticsContainer = () => {
  const { allExpenses, newExpense } = useEgress();
  const [expenses, setExpenses] = useState([]);
  const { allIncomes, newIncome } = useIncome();
  const [income, setIncome] = useState([]);

  //gastos
  useEffect(() => {
    async function getExpenses() {
      const response = await allExpenses();
      response.sort((a, b) => new Date(a.date) - new Date(b.date));

      setExpenses(response);
    }
    getExpenses();
  }, [newExpense]);

  //ingresos
  useEffect(() => {
    async function getIncomes() {
      const response = await allIncomes();
      response.sort((a, b) => new Date(a.date) - new Date(b.date));
      setIncome(response);
    }
    getIncomes();
  }, [newIncome]);

  // Procesar los gastos para agruparlos por mes
  const monthlyExpenses = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${month}`;

    if (acc[key]) {
      acc[key] += expense.amount;
    } else {
      acc[key] = expense.amount;
    }

    return acc;
  }, {});

  // Procesar los ingresos para agruparlos por mes
  const monthlyIncomes = income.reduce((acc, income) => {
    const date = new Date(income.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${month}`;

    if (acc[key]) {
      acc[key] += income.amount;
    } else {
      acc[key] = income.amount;
    }

    return acc;
  }, {});

  // Crear etiquetas y datos para el gráfico
  const labels = Object.keys(monthlyExpenses);
  const ultimasEtiquetas = labels.slice(-6);
  const ultimosDatosGastos = labels
    .slice(-6)
    .map((label) => monthlyExpenses[label]);
  const ultimosDatosIngresos = labels
    .slice(-6)
    .map((label) => monthlyIncomes[label] || 0);

  const data = {
    labels: ultimasEtiquetas.map((label) => {
      const [year, month] = label.split('-');
      return `${year}-${parseInt(month, 10) + 1}`;
    }),
    datasets: [
      {
        label: 'Gastos por Mes',
        data: ultimosDatosGastos,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Ingresos por Mes',
        data: ultimosDatosIngresos,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <Box component={'main'} sx={{}}>
      <Typography
        variant='h2'
        component='h3'
        sx={{ textAlign: 'center', mt: 2 }}
      >
        Tus estadísticas
      </Typography>
      <Box
        sx={{
          mt: 2,
          maxWidth: '800px',
          mx: 'auto',
        }}
      >
        <Line options={options} data={data} />
      </Box>
    </Box>
  );
};

export default StaticsContainer;
