import { React, useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TransactionCard from './TransactionCard';

import { useIncome } from '../../../context/IncomeContext';
import { useEgress } from '../../../context/EgressContext';

function RecentActivity() {
  const { expenses } = useEgress();
  const { incomes } = useIncome();

  const lastFiveIncomes = incomes.slice(-5).reverse();
  const lastFiveExpenses = expenses.slice(-5).reverse();

  const styles = {
    paper: {
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
      height: '45%',
      margin: '1rem',
      justifyContent: 'center',
      // backgroundColor: '#BDBDBD',
      backgroundColor: '#EAF6F4',
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
      // bgcolor='#BDBDBD'
      bgcolor='#EAF6F4'
      display='flex'
      flexDirection='column'
      alignItems='center'
      padding='16px'
    >
      <Typography variant='h5' textAlign={'center'}>
        Ultimos Movimientos
      </Typography>

      <Paper
        sx={styles.paper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={styles.contentContainer}>
          <Typography variant='h6' textAlign={'center'}>
            INGRESOS
          </Typography>
          {lastFiveIncomes.length < 1 ? (
            <Typography component='em' mt={3}>
              No hay ingresos
            </Typography>
          ) : (
            lastFiveIncomes?.map((item, index) => (
              <TransactionCard
                key={index}
                amount={` $${item.amount} `}
                categoryName={item.categoryName}
                description={item.description}
                date={item.date}
                type='INGRESO'
              />
            ))
          )}
        </Box>
      </Paper>

      <Paper
        sx={styles.paper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={styles.contentContainer}>
          <Typography variant='h6' textAlign={'center'}>
            GASTOS
          </Typography>

          {lastFiveExpenses.length < 1 ? (
            <Typography component='em' mt={3}>
              No hay gastos
            </Typography>
          ) : (
            lastFiveExpenses?.map((item, index) => (
              <TransactionCard
                key={index}
                amount={`-  $${item.amount} `}
                categoryName={item.categoryName}
                description={item.description}
                date={item.date}
                type='GASTO'
              />
            ))
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default RecentActivity;
