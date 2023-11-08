import { useNavigate } from 'react-router-dom';
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
import { useUser } from '../../context/UserContext';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796B',
    },
  },
});

const LoginContainer = () => {
  const [isLoged, setIsloged] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { getLoginUser, setUserData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const exist = Cookies.get('token');

    if (exist) {
      navigate('/home');
    }
  }, [isLoged]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await getLoginUser(data);

      if (res?.response?.status === 404) {
        setError('email', { message: 'Email no registrado' });
      }

      if (res?.response?.status === 400) {
        setError('password', { message: 'Contraseña incorrecta' });
      }

      if (res?.status === 200) {
        // Obtén la fecha actual
        const now = new Date();

        // Calcula la fecha y hora exactamente 10 segundos en el futuro
        const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        Cookies.set('token', res.data.email, { expires: in24Hours });
        setIsloged(true);
        setUserData(res.data);

        localStorage.setItem('userData', JSON.stringify(res.data));
      }
    } catch (error) {
      console.log(error);
    }
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
            <Grid item xs={12} sm={12}>
              <Typography sx={{ textAlign: 'center' }}>
                ¿No tienes cuenta? Haz clic{' '}
                <Typography to={'/register'} component={Link} variant='body2'>
                  acá
                </Typography>{' '}
                para registrarte.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginTop: '3rem', textAlign: 'center' }}>
          <Button component={Link} to={'/'} variant='contained'>
            Volver
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginContainer;
