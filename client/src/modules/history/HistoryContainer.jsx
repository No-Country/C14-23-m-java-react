import EgressDetails from './components/EgressDetails';
import IncomeDetails from './components/IncomeDetails';
import { Box } from '@mui/material';
import HeaderHistory from './components/HeaderHistory';

function HistoryContainer() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    // Establece flexDirection como "column" en pantallas pequeñas
    '@media (max-width: 899px)': {
      flexDirection: 'column',
    },
  };

  const detailsStyle = {
    display: 'flex',
    flex: '1',
    justyfyConten: ' center',
    width: '100vw',
  };

  return (
    <>
      <HeaderHistory />

      <Box sx={containerStyle}>
        <Box sx={detailsStyle}>
          <IncomeDetails />
        </Box>

        <Box sx={detailsStyle}>
          <EgressDetails />
        </Box>
      </Box>
    </>
  );
}

export default HistoryContainer;
