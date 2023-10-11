import { Container } from '@mui/material';
import IncomeExpenseComponent from './components/IncomeExpenseComponent';
import ModalHome from './components/ModalHome';
import { useState } from 'react';

const HomeContainer = () => {
  const [modal, setModal] = useState(false);

  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

  return (
    <Container component='main' maxWidth='md'>
      <ModalHome open={modal} handleClose={handleClose} />
      <button onClick={handleOpen}>abrir modal</button>

      <IncomeExpenseComponent />
    </Container>
  );
};
export default HomeContainer;
