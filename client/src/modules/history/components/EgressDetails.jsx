import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEgress } from '../../../context/EgressContext';

const egresos = [
  { categoria: 'alimentacion', monto: -5000, descripcion: 'Comida rápida', fecha: '2023/1/10' },
  { categoria: 'vivienda', monto: -50000, descripcion: 'Alquiler', fecha: '2023/1/15' },
  { categoria: 'transporte', monto: -300, descripcion: 'Pasaje de autobús', fecha: '2023/1/20' },
  { categoria: 'entretenimiento', monto: -5000, descripcion: 'Boletos de cine', fecha: '2023/1/25' },
  { categoria: 'salud y bienestar', monto: -8000, descripcion: 'Consulta médica', fecha: '2023/2/5' },
  { categoria: 'educacion', monto: -7000, descripcion: 'Libros y material de estudio', fecha: '2023/2/10' },
  { categoria: 'ropa y accesorios', monto: -16000, descripcion: 'Ropa de invierno', fecha: '2023/2/15' },
  { categoria: 'deudas y financiamientos', monto: -75000, descripcion: 'Pago de tarjeta de crédito', fecha: '2023/2/20' },
  { categoria: 'ahorro e inversión', monto: 20000, descripcion: 'Inversión en acciones', fecha: '2023/3/5' },
  { categoria: 'regalos', monto: -4000, descripcion: 'Regalo de cumpleaños', fecha: '2023/3/10' },
  { categoria: 'caridad', monto: -2000, descripcion: 'Donación a organización benéfica', fecha: '2023/3/15' },
  { categoria: 'viajes y vacaciones', monto: -15000, descripcion: 'Reserva de hotel', fecha: '2023/4/1' },
  { categoria: 'otros', monto: -700, descripcion: 'Gastos varios', fecha: '2023/4/15' },
  { categoria: 'alimentacion', monto: -5500, descripcion: 'Supermercado', fecha: '2023/4/25' },
  { categoria: 'vivienda', monto: -50000, descripcion: 'Alquiler y servicios', fecha: '2023/5/10' },
  { categoria: 'transporte', monto: -3500, descripcion: 'Combustible', fecha: '2023/5/20' },
  { categoria: 'entretenimiento', monto: -3000, descripcion: 'Cine con amigos', fecha: '2023/6/5' },
  { categoria: 'salud y bienestar', monto: -900, descripcion: 'Compra de vitaminas', fecha: '2023/6/20' },
  { categoria: 'educacion', monto: -18000, descripcion: 'Curso en línea', fecha: '2023/7/5' },
  { categoria: 'ropa y accesorios', monto: -5000, descripcion: 'Ropa de verano', fecha: '2023/7/15' },
  { categoria: 'deudas y financiamientos', monto: -6500, descripcion: 'Pago de préstamo', fecha: '2023/8/1' },
  { categoria: 'ahorro e inversión', monto: 30000, descripcion: 'Depósito en cuenta de ahorro', fecha: '2023/8/15' },
  { categoria: 'regalos', monto: -3500, descripcion: 'Regalo para aniversario', fecha: '2023/9/5' },
  { categoria: 'caridad', monto: -2500, descripcion: 'Donación a refugio de animales', fecha: '2023/9/20' },
  { categoria: 'viajes y vacaciones', monto: -90000, descripcion: 'Boletos de avión', fecha: '2023/10/1' },
  { categoria: 'otros', monto: -600, descripcion: 'Gastos varios', fecha: '2023/10/15' },
  { categoria: 'alimentacion', monto: -6000, descripcion: 'Cena en restaurante', fecha: '2023/11/5' },
  { categoria: 'vivienda', monto: -11000, descripcion: 'Pago de servicios', fecha: '2023/11/15' },
  { categoria: 'transporte', monto: -400, descripcion: 'Pasaje de tren', fecha: '2023/12/1' },
  { categoria: 'entretenimiento', monto: -35, descripcion: 'Boletos para concierto', fecha: '2023/12/15' },
  { categoria: 'salud y bienestar', monto: -85, descripcion: 'Compra de medicamentos', fecha: '2023/12/30' },
 
];

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
                    secondary={`Monto: ${egreso.amount}, Fecha: ${egreso.date}`}
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

        {/* <List>
          {egresos.map((egreso, index) => {
            if (!deletedItems.includes(index)) {
              return (
                <ListItem key={index}>
                  <ListItemText
                    primary={egreso.descripcion}
                    secondary={`Monto: ${egreso.monto}, Fecha: ${egreso.fecha}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            }
            return null;
          })}
        </List> */}
      </Box>
    </Paper>
  );
}

export default EgressDetails;