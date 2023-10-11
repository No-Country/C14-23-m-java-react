import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function RecentActivity(props) {
  const movimientos = [
    { tipo: 'ingreso', cantidad: 10000, descripcion: 'Venta de producto' },
    { tipo: 'egreso', cantidad: -2000, descripcion: 'Entrada cine' },
    { tipo: 'egreso', cantidad: -4780, descripcion: 'Pago de servicios' },
    { tipo: 'ingreso', cantidad: 5000, descripcion: 'ingresaste desde..' },
    { tipo: 'egreso', cantidad: -500, descripcion: 'Transporte' },
    { tipo: 'ingreso', cantidad: 50000, descripcion: 'Ingresaste desde' },
    { tipo: 'egreso', cantidad: -5000, descripcion: 'Ropa y accesorios' },
    { tipo: 'egreso', cantidad: -7000, descripcion: 'Compra alimentacion' },
    { tipo: 'ingreso', cantidad: -1500, descripcion: 'ingreso desde' },
    { tipo: 'egreso', cantidad: -5000, descripcion: 'Educacion' },
  ];

  return (
    <Box
      width='100%'
      height='100%'
      bgcolor='#BDBDBD'
      display='flex'
      flexDirection='column'
      alignItems='center' // Centra el contenido verticalmente
      padding='16px' // Añade espacio alrededor del contenido
    >
      <Typography variant='h6' textAlign={'center'}>
        Ultimos movimientos
      </Typography>

      <List>
        {movimientos.map((movimiento, index) => (
          <ListItem key={index} sx={{ p: 0 }}>
            <ListItemIcon>
              {movimiento.tipo === 'ingreso' ? (
                <ArrowUpwardIcon sx={{ color: 'green' }} />
              ) : (
                <ArrowDownwardIcon sx={{ color: 'red' }} />
              )}
            </ListItemIcon>
            <ListItemText
              primary={movimiento.descripcion}
              secondary={`Cantidad: $ ${movimiento.cantidad}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default RecentActivity;
