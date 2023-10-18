import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../../context/UserContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796B',
    },
  },
});

const RegisterContainer = () => {
  const [selectedCountry, setSelectedCountry] = useState('select');

  const handleCountryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const { userRegister } = useUser();

  const onSubmit = handleSubmit((data) => {
    userRegister(data);
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Registrarse
          </Typography>
        </Box>
        <Box component='form' sx={{ mt: 1 }} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='text'
                id={'name'}
                label={'Nombre'}
                name={'name'}
                required={true}
                {...register('name', {
                  required: 'Nombre es requerido',
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message:
                      'Solo se permiten caracteres alfabéticos y espacios',
                  },
                  minLength: {
                    value: 2,
                    message: 'Debe ser mayor a 2 caracteres',
                  },
                  maxLength: {
                    value: 45,
                    message: 'Debe ser menor a 45 caracteres',
                  },
                  validate: (value) => {
                    if (value.trim() === '') {
                      return 'El campo Nombre no puede estar vacío';
                    }
                    return true;
                  },
                })}
                error={errors.name ? true : false}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='text'
                id={'lastName'}
                label={'Apellido'}
                name={'lastName'}
                required={true}
                {...register('lastName', {
                  required: 'Apellido es requerido',
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message:
                      'Solo se permiten caracteres alfabéticos y espacios',
                  },
                  minLength: {
                    value: 2,
                    message: 'Debe ser mayor a 2 caracteres',
                  },
                  maxLength: {
                    value: 45,
                    message: 'Debe ser menor a 45 caracteres',
                  },
                  validate: (value) => {
                    if (value.trim() === '') {
                      return 'El campo Apellido no puede estar vacío';
                    }
                    return true;
                  },
                })}
                error={errors.lastName ? true : false}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                id={'email'}
                label={'Email'}
                name={'Email'}
                required={true}
                autoComplete={'email'}
                {...register('email', {
                  required: 'Email es requerido',
                  pattern: {
                    value:
                      /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: 'El email no es valido',
                  },
                  minLength: {
                    value: 18,
                    message: 'Debe ser mayor a 18 caracteres',
                  },
                  maxLength: {
                    value: 255,
                    message: 'Debe ser menor a 255 caracteres',
                  },
                })}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='password'
                id={'password'}
                label={
                  'Contraseña: 8+ caracteres, letras y/o números y 1 símbolo'
                }
                name={'password'}
                required={true}
                autoComplete={'current-password'}
                {...register('password', {
                  required: 'Contraseña es requerida',
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/,
                    message:
                      "La contraseña debe contener letras, símbolos y no debe incluir los siguientes símbolos: /= ¡ ' ? ¿ ´ [ { ] } , ; . : -",
                  },
                  minLength: {
                    value: 8,
                    message: 'Debe ser mayor a 8 caracteres',
                  },
                  maxLength: {
                    value: 45,
                    message: 'Debe ser menor a 45 caracteres',
                  },
                })}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='date'
                  id='date'
                  label='Fecha de nacimiento'
                  name='date'
                  InputLabelProps={{ shrink: true }}
                  required={true}
                  {...register('date', {
                    required: 'Fecha de nacimiento es requerida',
                    validate: (value) => {
                      const birthDate = new Date(value);
                      const currentDate = new Date();
                      const age =
                        currentDate.getFullYear() - birthDate.getFullYear();
                      return age < 18
                        ? 'Debes ser mayor de edad para registrarte'
                        : age > 100
                        ? 'La fecha ingresada no es valida'
                        : true;
                    },
                  })}
                  error={errors.date ? true : false}
                  helperText={errors.date?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='country' required={true}>
                    País de residencia
                  </InputLabel>
                  <Select
                    labelId='country'
                    id='country'
                    label='Country'
                    sx={{ width: '100%' }}
                    {...register('country', {
                      required: 'País de residencia es requerido',
                    })}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    <MenuItem value={'select'} disabled>
                      Seleccionar
                    </MenuItem>
                    <MenuItem value='AR'>Argentina</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: '#00796B',
                  '&:hover': { bgcolor: '#006B5B' },
                }}
              >
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterContainer;
