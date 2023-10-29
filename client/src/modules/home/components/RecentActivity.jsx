import { React, useEffect, useState } from 'react';
import { Box, Typography, Paper, Collapse } from '@mui/material';
import TransactionCard from './TransactionCard';
import CardInfo from './CardInfo';
import 'animate.css';

import { useIncome } from '../../../context/IncomeContext';
import { useEgress } from '../../../context/EgressContext';

function RecentActivity() {
  const { expenses } = useEgress();
  const { incomes } = useIncome();

  const [lastFiveIncom, setLastFiveIncom] = useState(true); //Estado para mostrar los ultimos ingresos
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
      backgroundColor: '#0f887a', //'#BDBDBD',
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
      bgcolor='#00796b'
      display='flex'
      flexDirection='column'
      alignItems='center'
      padding='0.78rem'
    >
      <Typography variant='h5' textAlign={'center'} color={'white'}>
        Ultimos movimientos
      </Typography>

      <Paper
        sx={styles.paper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={styles.contentContainer}>
          <Typography variant='h6' textAlign={'center'} sx={{ color: 'white' }}>
            Ingresos
          </Typography>

          {/**Muestra ingresos o la card */}

          {lastFiveIncom && (
            <div
              className='animate__animated animate__bounceInRight'
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {lastFiveIncomes?.map((item, index) => (
                <TransactionCard
                  key={index}
                  amount={` $${item.amount} `}
                  categoryName={item.categoryName}
                  description={item.description}
                  date={item.date}
                  setLastFiveIncom={setLastFiveIncom}
                  //estado del boton aca
                />
              ))}
            </div>
          )}

          {!lastFiveIncom && (
            <div className='animate__animated animate__flipInX'>
              <CardInfo setLastFiveIncom={setLastFiveIncom} />
            </div>
          )}
        </Box>
      </Paper>

      <Paper
        sx={styles.paper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={styles.contentContainer}>
          <Typography variant='h6' textAlign={'center'} sx={{ color: 'white' }}>
            Gastos
          </Typography>
          {lastFiveExpenses?.map((item, index) => (
            <TransactionCard
              key={index}
              amount={`-$${item.amount} `}
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
