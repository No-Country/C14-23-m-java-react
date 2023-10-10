import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const ButtonLanding = ({ to, variant, size, text, sx }) => {
  ButtonLanding.propTypes = {
    to: PropTypes.string.isRequerid,
    variant: PropTypes.string.isRequerid,
    size: PropTypes.string,
    text: PropTypes.string.isRequerid,
    sx: PropTypes.object,
  };

  return (
    <Button
      component={Link}
      to={to}
      variant={variant}
      size={size}
      sx={{
        bgcolor: '#00796B',
        '&:hover': { bgcolor: '#006B5B' },
        ...sx,
      }}
    >
      {text}
    </Button>
  );
};

export default ButtonLanding;
