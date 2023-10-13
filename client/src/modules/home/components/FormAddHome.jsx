import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { PropTypes } from 'prop-types';

const FormAddHome = ({ formType, handleClose }) => {
  FormAddHome.propTypes = {
    formType: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00796B',
      },
    },
  });

  const defaultValues =
    formType === 'gasto'
      ? { category: '', type: formType }
      : { type: formType };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    handleClose();
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 5 }}>
        <Typography variant='h5' align='center'>
          {formType === 'gasto' ? 'Añadir Gasto' : 'Añadir Ingreso'}
        </Typography>
        <Box component='form' sx={{ mt: 2 }} onSubmit={onSubmit}>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            type='number'
            id={'amount'}
            label={'Monto'}
            name={'amount'}
            {...register('amount', {
              required: 'El monto es requerido',
            })}
            error={errors.amount ? true : false}
            helperText={errors.amount?.message}
          />

          {formType === 'gasto' && (
            <FormControl
              fullWidth
              error={errors.category ? true : false}
              sx={{ mb: 2 }}
            >
              <InputLabel id='category'>Categoría</InputLabel>
              <Controller
                name='category'
                control={control}
                rules={{ required: 'La categoría es requerida' }}
                render={({ field }) => (
                  <Select labelId='category' label='Categoría' {...field}>
                    <MenuItem value='salud'>Salud</MenuItem>
                    <MenuItem value='entretenimiento'>Entretenimiento</MenuItem>
                    <MenuItem value='alimentacion'>Alimentación</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>
                {errors.category ? errors.category.message : ''}
              </FormHelperText>
            </FormControl>
          )}

          <TextField
            sx={{ mb: 2 }}
            fullWidth
            type='text'
            id={'description'}
            label={'Descripción'}
            name={'description'}
            {...register('description', {
              required: 'La descripción es requerida',
            })}
            error={errors.description ? true : false}
            helperText={errors.description?.message}
          />

          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3 }}>
            Enviar
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default FormAddHome;
