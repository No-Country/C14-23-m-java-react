import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import TextLanding from './components/TextLanding';
import ImageLanding from './components/ImageLanding';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const LandingContainer = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const navigate = useNavigate();

  useEffect(() => {
    const exist = Cookies.get('token');

    if (exist) {
      navigate('/home');
    }
  }, []);

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <TextLanding variant='h1' component='h1' text='CASHFLOW' />
            <TextLanding
              variant='h4'
              component='h2'
              text='Sistema de gestión de finanzas personales'
            />
            <TextLanding
              variant='h6'
              component='p'
              text='
              ¡Comienza a administrar tus finanzas de manera inteligente y toma
              el control de tu futuro financiero!
'
            />

            <Button
              component={NavLink}
              to='/login'
              variant='contained'
              size='large'
              sx={{
                bgcolor: '#00796B',
                '&:hover': { bgcolor: '#006B5B' },
                mt: 2,
              }}
            >
              Comenzar
            </Button>
          </Box>
          <Box sx={{ flex: 1 }}>
            <ImageLanding />
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default LandingContainer;
