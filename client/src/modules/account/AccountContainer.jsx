import { useNavigate } from 'react-router-dom';
import {
  Box,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import NameSetting from './components/NameSetting';
import PasswordSetting from './components/PasswordSetting';
import EmailSetting from './components/EmailSetting';
import HeaderAccount from './components/HeaderAccount';
import { useUser } from '../../context/UserContext';
import Cookies from 'js-cookie';

const AccountContainer = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#00796B',
      },
    },
  });

  const { userData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      Cookies.remove('token');
      navigate('/login');
    }
  }, [userData]);

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

  return (
    <ThemeProvider theme={theme}>
      <HeaderAccount />
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
            <NameSetting />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PasswordSetting />
            {/* <PersonalSetting /> */}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* <PersonalSetting /> */}
            <EmailSetting />
          </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AccountContainer;
