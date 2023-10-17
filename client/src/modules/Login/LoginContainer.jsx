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
                autoComplete={'email'}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email is not valid',
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
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Password must be at most 20 characters long',
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
              <Typography href='#' component='a' variant='body2'>
                Olvidaste tu contraseña?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography to={'/register'} component={Link} variant='body2'>
                No tienes cuenta? Regístrate
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginContainer;
