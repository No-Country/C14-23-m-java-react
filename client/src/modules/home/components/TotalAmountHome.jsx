import { Paper, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import { NumericFormat } from 'react-number-format';

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
      <NumericFormat
        value={total}
        thousandSeparator=','
        displayType='text'
        decimalScale={2}
        fixedDecimalScale={true}
        prefix='$'
        renderText={(value) => (
          <Typography variant='h5' sx={{ color: color }}>
            {value}
          </Typography>
        )}
      />
    </Paper>
  );
};

export default TotalAmountHome;
