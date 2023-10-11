import { Paper, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

const TotalAmountHome = ({ text, total, color }) => {
  TotalAmountHome.propTypes = {
    text: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  };
  return (
    <Paper
      elevation={2}
      sx={{
        py: 1,
        textAlign: 'center',
        borderRadius: '0',
      }}
    >
      <Typography variant='h6'>{text}:</Typography>
      <Typography variant='h5' sx={{ color: color }}>
        ${total}
      </Typography>
    </Paper>
  );
};

export default TotalAmountHome;
