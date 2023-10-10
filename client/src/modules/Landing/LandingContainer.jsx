import {
  Box,
  Container,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import TextLanding from './components/TextLanding';
import ImageLanding from './components/ImageLanding';
import ButtonLanding from './components/ButtonLanding';

const LandingContainer = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            pt: 10,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <TextLanding
              variant='h2'
              component='h1'
              text='Sistema de gestión de de finanzas personales'
            />
            <TextLanding
              variant='h6'
              component='p'
              text='
              ¡Comienza a administrar tus finanzas de manera inteligente y toma
              el control de tu futuro financiero!
'
            />

            <ButtonLanding
              to='/login'
              variant='contained'
              size='large'
              text='ACCEDER'
              sx={{ mt: 2, mr: 2 }}
            />

            <ButtonLanding
              to='/register'
              variant='contained'
              size='large'
              text='REGISTRARSE'
              sx={{ mt: 2 }}
            />
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
