import { Container } from '@mui/material';
import IncomeExpenseComponent from './components/IncomeExpenseComponent';
import ModalHome from './components/ModalHome';
import { useState } from 'react';

const HomeContainer = () => {
  const [modal, setModal] = useState(false);
  const [type, setType] = useState('');

  const handleOpen = (formType) => {
    setType(formType);
    setModal(true);
  };
  const handleClose = () => setModal(false);

  return (
    <Container component='main' maxWidth='md'>
      <ModalHome open={modal} handleClose={handleClose} formType={type} />
      <button onClick={() => handleOpen('gasto')}>abrir modal gasto</button>
      <button onClick={() => handleOpen('ingreso')}>abrir modal ingreso</button>

      <IncomeExpenseComponent />
    </Container>
  );
};
export default HomeContainer;
