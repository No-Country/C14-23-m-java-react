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
import { useEgress } from '../../../context/EgressContext';
import { useIncome } from '../../../context/IncomeContext';

const FormAddHome = ({
  formType,
  handleClose,
  categories,
  handleOpenAlert,
  setLoading,
}) => {
  FormAddHome.propTypes = {
    formType: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleOpenAlert: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    setLoading: PropTypes.func.isRequired,
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00796B',
      },
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { categoryName: '' },
  });

  const { addNewGasto } = useEgress();
  const { addNewIncome } = useIncome();

  const onSubmit = handleSubmit(async (data) => {
    let amount = parseFloat(data.amount);
    amount =
      amount % 1 !== 0
        ? (Math.round(amount * 100) / 100).toFixed(2)
        : amount.toFixed();

    const newData = {
      ...data,
      idUser: 1,
      amount: amount,
      date: new Date().toISOString().split('T')[0],
    };

    handleClose();

    setLoading(true);
    try {
      if (formType === 'GASTO') {
        const res = await addNewGasto(newData);
        if (res.status === 201) {
          handleOpenAlert();
        }
      } else {
        const res = await addNewIncome(newData);
        if (res.status === 201) {
          handleOpenAlert();
        }
      }
    } catch {
      handleOpenAlert(true);
    } finally {
      setLoading(false);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 5 }}>
        <Typography variant='h5' align='center'>
          {formType === 'GASTO' ? 'Añadir Gasto' : 'Añadir Ingreso'}
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
            onBlur={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                e.target.value = Math.round(value * 100) / 100;
              }
            }}
            inputProps={{
              step: 0.01,
            }}
          />

          <FormControl
            fullWidth
            error={errors.categoryName ? true : false}
            sx={{ mb: 2 }}
          >
            <InputLabel id='categoryName'>Categoría</InputLabel>
            <Controller
              name='categoryName'
              control={control}
              rules={{ required: 'La categoría es requerida' }}
              render={({ field }) => (
                <Select labelId='categoryName' label='Categoría' {...field}>
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.option}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.categoryName ? errors.categoryName.message : ''}
            </FormHelperText>
          </FormControl>

          <TextField
            sx={{ mb: 2 }}
            fullWidth
            type='text'
            id={'description'}
            label={'Descripción'}
            name={'description'}
            {...register('description', {
              maxLength: {
                value: 100,
                message: 'Máximo 100 caracteres permitidos para este campo',
              },
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
