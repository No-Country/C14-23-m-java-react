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
