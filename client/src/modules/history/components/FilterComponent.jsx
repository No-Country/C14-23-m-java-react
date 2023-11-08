import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import PropTypes from 'prop-types';

const FilterComponent = ({ categories, handleFilters, filters }) => {
  FilterComponent.propTypes = {
    categories: PropTypes.array,
    handleFilters: PropTypes.func,
    filters: PropTypes.object,
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <FormControl variant='outlined' size='small' sx={{ width: '10rem' }}>
        <InputLabel>Mes</InputLabel>
        <Select
          name='month'
          label='Mes'
          onChange={handleFilters}
          value={filters.month}
        >
          <MenuItem value='all'>Todos</MenuItem>
          <MenuItem value={1}>Enero</MenuItem>
          <MenuItem value={2}>Febrero</MenuItem>
          <MenuItem value={3}>Marzo</MenuItem>
          <MenuItem value={4}>Abril</MenuItem>
          <MenuItem value={5}>Mayo</MenuItem>
          <MenuItem value={6}>Junio</MenuItem>
          <MenuItem value={7}>Julio</MenuItem>
          <MenuItem value={8}>Agosto</MenuItem>
          <MenuItem value={9}>Septiembre</MenuItem>
          <MenuItem value={10}>Octubre</MenuItem>
          <MenuItem value={11}>Noviembre</MenuItem>
          <MenuItem value={12}>Diciembre</MenuItem>
        </Select>
      </FormControl>{' '}
      <FormControl variant='outlined' size='small' sx={{ width: '10rem' }}>
        <InputLabel>Categorías</InputLabel>
        <Select
          label='Categorías'
          name='categoryId'
          onChange={handleFilters}
          value={filters.categoryId}
        >
          <MenuItem value='all'>Todas</MenuItem>
          {categories?.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterComponent;
