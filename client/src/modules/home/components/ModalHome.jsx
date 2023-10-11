import { Box, Modal } from '@mui/material';
import FormAddHome from './FormAddHome';
import { PropTypes } from 'prop-types';

const ModalHome = ({ open, handleClose }) => {
  ModalHome.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            bgcolor: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <FormAddHome />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalHome;
