import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useIncome } from '../../../context/IncomeContext';

function IncomeDetails() {
  const [isHovered, setIsHovered] = useState(false);
  const [incomesData, setIncomesData] = useState(null);

  const { allIncomes, delIncome } = useIncome(); // uso el contexto

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await allIncomes();
        setIncomesData(res); // almaceno la informacion en el estado
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const styles = {
    paper: {
      margin: '1rem',
      padding: '2rem',
      transition: 'box-shadow 0.3s',
      cursor: 'pointer',
    },
    paperHover: {
      boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
    },
  };

  return (
    <Paper
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      sx={{ ...styles.paper, ...(isHovered && styles.paperHover) }}
    >
      <Box>
        <Typography variant='h5' display={'flex'} justifyContent={'center'}>
          Tus ingresos
        </Typography>

        <List>
          {incomesData?.map((income, index) => {
            return (
              <ListItem key={index}>
                <ListItemText
                  primary={income.description}
                  secondary={`Monto: ${income.amount} Fecha: ${income.date}  Categoria: ${income.categoryName}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => delIncome(income.idIncome)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
}

export default IncomeDetails;
