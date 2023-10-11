import { Button, Grid, Paper } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import TotalAmountHome from './TotalAmountHome';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseByCategory = () => {
  const [saldo, setSaldo] = useState(10000);
  const [gastos, setGastos] = useState(7000);

  const calculatePorcentajes = () => {
    const disponiblePorcentaje = ((saldo - gastos) / saldo) * 100;
    const gastosPorcentaje = (gastos / saldo) * 100;

    return [disponiblePorcentaje, gastosPorcentaje];
  };

  const categories = [
    { label: 'Disponible', color: 'rgba(0, 121, 107)' },
    { label: 'Gastos', color: 'rgba(0, 121, 107, 0.7)' },
  ];

  const [data, setData] = useState({
    labels: categories.map((category) => category.label),
    datasets: [
      {
        label: '%',
        data: calculatePorcentajes(),
        backgroundColor: categories.map((category) => category.color),
        borderColor: 'white',
        borderWidth: 5,
      },
    ],
  });

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
  }, [saldo, gastos]);

  return (
    <Paper sx={{ mt: 2, width: '250px', p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button
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
              options={{ plugins: { legend: { position: 'bottom' } } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TotalAmountHome
              text={'Total Ingresos'}
              total={saldo}
              color={'green'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ExpenseByCategory;
