import { React, useEffect, useState } from 'react';
import { Box, Typography, Paper, Collapse } from '@mui/material';
import TransactionCardIncomes from './TransactionCardIncomes';
import TransacCardEgress from './TransacCardEgress';
import CardInfoIncome from './CardInfoIncome';
import 'animate.css';

import { useIncome } from '../../../context/IncomeContext';
import { useEgress } from '../../../context/EgressContext';
import CardInfoExpenses from './CardInfoExpenses';

function RecentActivity() {
  const { expenses } = useEgress();
  const { incomes } = useIncome();

  const [lastFiveIncom, setLastFiveIncom] = useState(true); //Estado para mostrar los ultimos ingresos
  const [infoCardIncomes, setInfoCardIncomes] = useState(null);
  const [infoCardExpenses, setInfoCardExpenses] = useState(null);
  const [lasFiveEgress, setLastFiveEgress] = useState(true);
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
      height='85vh'
      bgcolor='#00796b'
      display='flex'
      flexDirection='column'
      alignItems='center'
      padding='0.78rem'
    >
      <Typography
        variant='h5'
        textAlign={'center'}
        color={'white'}
        sx={{
          '@media (max-width: 400px)': {
            fontSize: '16px',
          },
        }}
      >
        Ultimos movimientos
      </Typography>

      <Paper
        sx={styles.paper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={styles.contentContainer}>
          <Typography
            variant='h6'
            textAlign={'center'}
            sx={{
              color: 'white',
              '@media (max-width: 400px)': {
                fontSize: '16px',
              },
            }}
          >
            Ingresos
          </Typography>

          {/**Muestra ingresos o la card */}

          {lastFiveIncom && (
            <div
              className='animate__animated  animate__flipInX'
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {lastFiveIncomes?.map((item, index) => (
                <TransactionCardIncomes
                  key={index}
                  amount={` $${item.amount} `}
                  categoryName={item.categoryName}
                  description={item.description}
                  date={item.date}
                  setLastFiveIncom={setLastFiveIncom}
                  info={item}
                  setInfoCard={setInfoCardIncomes}
                  //estado del boton aca
                />
              ))}
            </div>
          )}

          {!lastFiveIncom && (
            <div className='animate__animated animate__flipInX'>
              <CardInfoIncome
                setLastFiveIncom={setLastFiveIncom}
                amount={infoCardIncomes?.amount}
                date={infoCardIncomes?.date}
                description={infoCardIncomes?.description}
                categoryName={infoCardIncomes?.categoryName}
              />
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
          <Typography
            variant='h6'
            textAlign={'center'}
            sx={{
              color: 'white',
              '@media (max-width: 400px)': {
                fontSize: '16px',
              },
            }}
          >
            Gastos
          </Typography>

          {/**se muestran los ultimos 5 gastos o la informacion que contiene */}
          {lasFiveEgress && (
            <div
              className='animate__animated  animate__flipInX'
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {lastFiveExpenses?.map((item, index) => (
                <TransacCardEgress
                  key={index}
                  amount={`-$${item.amount} `}
                  categoryName={item.categoryName}
                  description={item.description}
                  date={item.date}
                  setLastFiveEgress={setLastFiveEgress}
                  info={item}
                  setInfoCard={setInfoCardExpenses}
                />
              ))}
            </div>
          )}

          {!lasFiveEgress && (
            <div className='animate__animated animate__flipInX'>
              <CardInfoExpenses
                setLastFiveExpenses={setLastFiveEgress}
                amount={infoCardExpenses?.amount}
                date={infoCardExpenses?.date}
                description={infoCardExpenses?.description}
                categoryName={infoCardExpenses?.categoryName}
              />
            </div>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default RecentActivity;
