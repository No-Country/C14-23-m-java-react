import React, { useState } from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ingresos = [
  { monto: 1000, fecha: '2023/1/5', descripcion: 'Sueldo de enero' },
  { monto: 500, fecha: '2023/1/12', descripcion: 'Ingreso extra por horas extras' },
  { monto: 200, fecha: '2023/2/1', descripcion: 'Venta de objetos personales' },
  { monto: 3000, fecha: '2023/2/10', descripcion: 'Primer premio en concurso de diseño' },
  { monto: 1500, fecha: '2023/3/7', descripcion: 'Préstamo de un amigo' },
  { monto: 2000, fecha: '2023/3/15', descripcion: 'Ingreso por trabajos de diseño gráfico' },
  { monto: 500, fecha: '2023/4/3', descripcion: 'Regalo de cumpleaños' },
  { monto: 700, fecha: '2023/4/20', descripcion: 'Venta de artesanías' },
  { monto: 1200, fecha: '2023/5/2', descripcion: 'Ingreso adicional por bono de desempeño' },
  { monto: 600, fecha: '2023/5/18', descripcion: 'Venta de antigüedades' },
  { monto: 250000, fecha: '2023/6/5', descripcion: 'Sueldo de febrero' },
  { monto: 250000, fecha: '2023/7/12', descripcion: 'Sueldo de marzo' },
  { monto: 250000, fecha: '2023/8/1', descripcion: 'Sueldo de abril' },
  { monto: 270000, fecha: '2023/9/10', descripcion: 'Sueldo de mayo' },
  { monto: 270000, fecha: '2023/10/7', descripcion: 'Sueldo de junio' },
  { monto: 270000, fecha: '2023/11/15', descripcion: 'Sueldo de julio' },
  { monto: 270000, fecha: '2023/12/3', descripcion: 'Sueldo de agosto' },
  { monto: 270000, fecha: '2023/12/20', descripcion: 'Sueldo de septiembre' },
  { monto: 270000, fecha: '2024/1/2', descripcion: 'Sueldo de octubre' },
  { monto: 280000, fecha: '2024/2/18', descripcion: 'Sueldo de noviembre' },
];


function IncomeDetails() {
  const [isHovered, setIsHovered] = useState(false);
  const [deletedItems, setDeletedItems] = useState([]);

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
        <Typography variant='h5' display={'flex'} justifyContent={'center'}>Tus ingresos</Typography>
        <List>
          {ingresos.map((ingreso, index) => {
            if (!deletedItems.includes(index)) {
              return (
                <ListItem key={index}>
                  <ListItemText
                    primary={ingreso.descripcion}
                    secondary={`Monto: $${ingreso.monto}, Fecha: ${ingreso.fecha}`}
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
        </List>
      </Box>
    </Paper>
  );
}

export default IncomeDetails;