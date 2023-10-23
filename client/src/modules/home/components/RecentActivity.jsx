import { React, useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TransactionCard from './TransactionCard';

import { useIncome } from '../../../context/IncomeContext';
import { useEgress } from '../../../context/EgressContext';

function RecentActivity(props) {
  const [incomesData, setIncomesData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [lastFiveIncomes, setLastFiveIncomes] = useState([]);
  const [lastFiveExpenses, setLastFiveExpenses] = useState([]);

  const { allExpenses } = useEgress();
  const { allIncomes } = useIncome();

  useEffect(() => {
    async function fetchData() {
      try {
        const allInc = await allIncomes();
        const allExp = await allExpenses();

        // Actualiza los estados para mantener solo las últimas 5 entradas
        setLastFiveIncomes(allInc.slice(-5).reverse());
        setLastFiveExpenses(allExp.slice(-5).reverse());
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const styles = {
    paper: {
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
      height: '45%',
      margin: '1rem',
      justifyContent: 'center',
      backgroundColor: '#BDBDBD',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      transition: 'box-shadow 0.3s',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      height: '100%', // Añadimos esta propiedad para que el contenido no desborde
    },
  };

  const handleMouseEnter = (event) => {
    event.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.7)';
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.boxShadow = styles.paper.boxShadow;
  };

  return (
    <Box
      width='100%'
      height='100%'
      bgcolor='#BDBDBD'
      display='flex'
      flexDirection='column'
      alignItems='center'
      padding='16px'
    >
      <Typography variant='h5' textAlign={'center'}>
        Ultimos movimientos
      </Typography>

      <Paper
        sx={styles.paper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={styles.contentContainer}>
          <Typography variant='h6' textAlign={'center'}>
            Ingresos
          </Typography>
          {lastFiveIncomes?.map((item, index) => (
            <TransactionCard
              key={index}
              amount={` $${item.amount} `}
              categoryName={item.categoryName}
              description={item.description}
              date={item.date}
            />
          ))}
        </Box>
      </Paper>

      <Paper
        sx={styles.paper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={styles.contentContainer}>
          <Typography variant='h6' textAlign={'center'}>
            Gastos
          </Typography>
          {lastFiveExpenses?.map((item, index) => (
            <TransactionCard
              key={index}
              amount={`-  $${item.amount} `}
              categoryName={item.categoryName}
              description={item.description}
              date={item.date}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default RecentActivity;
