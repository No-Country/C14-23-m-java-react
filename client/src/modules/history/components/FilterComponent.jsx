import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const FilterComponent = () => {
  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    console.log(`Seleccionaste el mes: ${selectedMonth}`);
  };

  const handleCategoryChange = (event) => {
    const selecteCatgory = event.target.value;
    console.log(`Seleccionaste la categoria: ${selecteCatgory}`);
  };

  return (
    <Box  sx={{display: 'flex'}}>
      <FormControl variant='outlined' size='small' sx={{ width: '10rem' }}>
        <InputLabel>Mes</InputLabel>
        <Select label='Mes' onChange={handleMonthChange}>
          <MenuItem value=''>Todos</MenuItem>
          <MenuItem value='enero'>Enero</MenuItem>
          <MenuItem value='febrero'>Febrero</MenuItem>
          <MenuItem value='marzo'>Marzo</MenuItem>
          {/* Agrega más meses según tus necesidades */}
        </Select>
      </FormControl>{' '}

      <FormControl variant="outlined" size="small" sx={{width:'10rem'}}>
      <InputLabel>Categorias</InputLabel>
      <Select
        label="Categorias"
        onChange={handleCategoryChange}
      >
        <MenuItem value="">Todos</MenuItem>
        <MenuItem value="enero">viajes</MenuItem>
        <MenuItem value="febrero">vacaciones</MenuItem>
        <MenuItem value="marzo">Marzo</MenuItem>
        {/* Agrega más meses según tus necesidades */}
      </Select>
    </FormControl>
    </Box>
  );
};

export default FilterComponent;
