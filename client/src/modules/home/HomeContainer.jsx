import { Container } from '@mui/material';
import IncomeExpenseComponent from './components/IncomeExpenseComponent';

const HomeContainer = () => {
  return (
    <Container component='main' maxWidth='md'>
      <IncomeExpenseComponent />
    </Container>
  );
};
export default HomeContainer;
