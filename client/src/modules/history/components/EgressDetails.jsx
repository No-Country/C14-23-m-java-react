import { useEffect, useState } from 'react';

import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEgress } from '../../../context/EgressContext';
import CardExpenses from './CardExpenses';
import FilterComponent from './FilterComponent';

function EgressDetails() {
  const [isHovered, setIsHovered] = useState(false);
  const [expensesData, setExpensesData] = useState(null);

  const { allExpenses, delExpense, newExpense, deleteExpense } = useEgress(); // uso el contexto

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await allExpenses();
        setExpensesData(res); // Almacena res en el estado
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [newExpense, deleteExpense]);

  const styles = {
    paper: {
      margin: '1rem',
      padding: '2rem',
     display: 'flex',
     justifyContent: 'center',
      transition: 'box-shadow 0.3s',
      cursor: 'pointer',
      display: 'flex',
      width: '45vw',
      '@media (max-width: 899px)': {
        width: '90vw',
      },
    },
    paperHover: {
      boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
    },
  };

  return (
    <Paper
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      sx={{ ...styles.paper, ...(isHovered && styles.paperHover) }}
    >
      <Box>
        <Box>
          <Typography variant='h5' display={'flex'} justifyContent={'center'}>
            Tus gastos
          </Typography>
          <FilterComponent />
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
          {expensesData?.map((egreso, index) => {
            return (
              <CardExpenses
                key={index}
                id={egreso.idEgress}
                delExpenses={delExpense}
                date={egreso.date}
                amount={egreso.amount}
                categoryName={egreso.categoryName}
                description={egreso.description}
              />
            );
          })}
        </List>
      </Box>
    </Paper>
  );
}

export default EgressDetails;
