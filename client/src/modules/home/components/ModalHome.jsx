import { Box, IconButton, Modal } from '@mui/material';
import FormAddHome from './FormAddHome';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { PropTypes } from 'prop-types';

const ModalHome = ({
  open,
  handleClose,
  handleOpenAlert,
  formType,
  setLoading,
}) => {
  ModalHome.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleOpenAlert: PropTypes.func.isRequired,
    formType: PropTypes.string.isRequired,
    setLoading: PropTypes.func.isRequired,
  };

  const expenseCategories = [
    { option: 'Alimentación', value: 'ALIMENTACION' },
    { option: 'Vivienda', value: 'VIVIENDA' },
    { option: 'Transporte', value: 'TRANSPORTE' },
    { option: 'Entretenimiento', value: 'ENTRETENIMIENTO' },
    { option: 'Salud - Cuidado Personal', value: 'SALUD_CUIDADO PERSONAL' },
    { option: 'Educación', value: 'EDUCACION' },
    { option: 'Vestimenta', value: 'VESTIMENTA' },
    { option: 'Servicios', value: 'SERVICIOS' },
    { option: 'Ahorro - Inversión', value: 'AHORRO_INVERSION' },
    { option: 'Viaje - Vacaciones', value: 'VIAJE_VACACIONES' },
    { option: 'Otros', value: 'OTROS' },
  ];

  const incomeCategories = [
    { option: 'Sueldo Mensual', value: 'SUELDO_MENSUAL' },
    { option: 'Préstamo', value: 'PRESTAMO' },
    { option: 'Clientes Regalo', value: 'CLIENTES_REGALO' },
    { option: 'Bono Extra', value: 'BONO_EXTRA' },
    { option: 'Otros', value: 'OTROS' },
  ];

  const categories =
    formType === 'GASTO' ? expenseCategories : incomeCategories;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: {
            xs: '90%',
            sm: '80%',
          },
          maxWidth: '500px',
          bgcolor: '#fff',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseOutlinedIcon />
        </IconButton>
        <FormAddHome
          handleOpenAlert={handleOpenAlert}
          formType={formType}
          handleClose={handleClose}
          categories={categories}
          setLoading={setLoading}
        />
      </Box>
    </Modal>
  );
};

export default ModalHome;
