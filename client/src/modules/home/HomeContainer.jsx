import { Box, Grid } from '@mui/material';
import IncomeExpenseComponent from './components/IncomeExpenseComponent';
import ExpenseByCategory from './components/ExpenseByCategory';
import TotalAmountHome from './components/TotalAmountHome';
import RecentActivity from './components/RecentActivity';

const HomeContainer = () => {
  return (
    <Box
      component='main'
      sx={{ width: '100%', margin: 0, height: 'calc(100vh - 64px)' }}
    >
      <TotalAmountHome
        text={'Saldo disponible'}
        total={10000}
        color={'green'}
      />
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item container xs={8} alignItems='center'>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IncomeExpenseComponent />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ExpenseByCategory />
          </Grid>
        </Grid>
        <Grid item container xs={4}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
};
export default HomeContainer;
