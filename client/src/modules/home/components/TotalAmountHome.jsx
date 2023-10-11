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
      elevation={4}
      sx={{
        p: 2,
        textAlign: 'center',
      }}
    >
      <Typography>{text}:</Typography>
      <Typography variant='h4' sx={{ color: color }}>
        ${total}
      </Typography>
    </Paper>
  );
};

export default TotalAmountHome;
