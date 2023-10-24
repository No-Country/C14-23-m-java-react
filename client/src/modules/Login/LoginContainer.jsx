import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796B',
    },
  },
});

const LoginContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));

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
            Iniciar sesión
          </Typography>
        </Box>
        <Box component='form' sx={{ mt: 2 }} onSubmit={onSubmit}>
          <Grid container spacing={3}>
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
                label={'Contraseña'}
                name={'password'}
                autoComplete={'current-password'}
                {...register('password', {
                  required: 'Contraseña es requerida',
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

            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  mb: 2,
                  bgcolor: '#00796B',
                  '&:hover': { bgcolor: '#006B5B' },
                }}
              >
                Iniciar sesión
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                ¿Olvidaste tu contraseña? Haz clic{' '}
                <Typography to={'#'} component={Link} variant='body2'>
                  acá
                </Typography>{' '}
                para recuperarla.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                ¿No tienes cuenta? Haz clic{' '}
                <Typography to={'/register'} component={Link} variant='body2'>
                  acá
                </Typography>{' '}
                para registrarte.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginContainer;
