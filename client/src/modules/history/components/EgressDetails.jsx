import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEgress } from '../../../context/EgressContext';


function EgressDetails() {
  const [isHovered, setIsHovered] = useState(false);
  const [deletedItems, setDeletedItems] = useState([]);
  const [expensesData, setExpensesData] = useState(null);

  const {allExpenses, delExpense} = useEgress() // uso el contexto

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await allExpenses();
        setExpensesData(res); // Almacena res en el estado
       
      } catch (error) {
        console.log('error');
      }
    }
    fetchData();
  }, [expensesData]);


  
  const styles = {
    paper: {
      margin: '1rem',
       padding: '1rem',
      transition: 'box-shadow 0.3s',
      cursor: 'pointer',
    },
    paperHover: {
      boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
    },
  };

  const handleDeleteItem = (index) => {
    const updatedDeletedItems = [...deletedItems, index];
    setDeletedItems(updatedDeletedItems);
  };

  return (
    <Paper
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      sx={{ ...styles.paper, ...(isHovered && styles.paperHover) }}
    >
    

      <Box>
        <Typography variant='h5'display={'flex'} justifyContent={'center'} >Tus gastos</Typography>

        <List>
          {
            expensesData?.map((egreso, index) =>{
              return (
                <ListItem key={index} >
                  <ListItemText
                    primary={egreso.description}
                    secondary={`Monto: ${egreso.amount}, Fecha: ${egreso.date} Categoria : ${egreso.categoryName}` }
                  />
                   <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={(item) => delExpense(egreso.idEgress)} >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })
          }
        </List>

        
      </Box>
    </Paper>
  );
}

export default EgressDetails;