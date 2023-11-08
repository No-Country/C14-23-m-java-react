import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import NameSetting from './components/NameSetting';
import PasswordSetting from './components/PasswordSetting';
import EmailSetting from './components/EmailSetting';
import HeaderAccount from './components/HeaderAccount';
import { useUser } from '../../context/UserContext';
import Cookies from 'js-cookie';

const AccountContainer = () => {
  const { userData, setUserData, partialUpdateUser } = useUser();

  const [loadingData, setLoadingData] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      Cookies.remove('token');
      navigate('/login');
    } else {
      setLoadingData(false);
    }
  }, [userData, navigate]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00796B',
      },
    },
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  const handleCloseAlert = () => setAlert(false);
  const handleOpenAlert = () => setAlert(true);

  const handleUpdate = async (data) => {
    setError(false);
    setLoading(true);
    try {
      const res = await partialUpdateUser(userData.idUser, data);
      setUserData(res.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      handleOpenAlert();
    }
  };

  const isMobile = useMediaQuery('(max-width:600px)');

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ maxWidth: { sm: '70%' }, mx: 'auto', p: 2 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loadingData) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <HeaderAccount />

      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}

      <Snackbar
        open={alert}
        onClose={handleCloseAlert}
        autoHideDuration={error ? 8000 : 3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          variant='standard'
          severity={error ? 'error' : 'success'}
          color={error ? 'error' : 'success'}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={handleCloseAlert}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          {error
            ? 'Ocurrió un error, intente mas tarde'
            : 'Datos guardados exitosamente!'}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          maxWidth: 'md',
          mx: 'auto',
          mt: 5,
        }}
      >
        <Typography variant='h5' mb={2} pl={2}>
          Configuración de Cuenta
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          height: 500,
          maxWidth: 'md',
          mx: 'auto',
        }}
      >
        <Tabs
          orientation={isMobile ? 'horizontal' : 'vertical'}
          variant='scrollable'
          scrollButtons={isMobile}
          allowScrollButtonsMobile
          value={value}
          onChange={handleChange}
          aria-label='user settings tabs'
          sx={{
            borderRight: isMobile ? 0 : 1,
            borderColor: isMobile ? 'none' : 'divider',
            width: isMobile ? 'auto' : 200,
          }}
        >
          <Tab label='Nombre' {...a11yProps(0)} />
          <Tab label='Contraseña' {...a11yProps(1)} />
          <Tab label='Email' {...a11yProps(2)} />
        </Tabs>
        <Box sx={{ width: '100%' }}>
          <TabPanel value={value} index={0}>
            <NameSetting
              data={{ name: userData.name, last_name: userData.last_name }}
              handleUpdate={handleUpdate}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PasswordSetting />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <EmailSetting
              data={{ email: userData.email }}
              handleUpdate={handleUpdate}
            />
          </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AccountContainer;
