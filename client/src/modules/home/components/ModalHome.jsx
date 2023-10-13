import { Box, IconButton, Modal } from '@mui/material';
import FormAddHome from './FormAddHome';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { PropTypes } from 'prop-types';

const ModalHome = ({ open, handleClose, formType }) => {
  ModalHome.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    formType: PropTypes.string.isRequired,
  };

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
        <FormAddHome formType={formType} handleClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default ModalHome;
