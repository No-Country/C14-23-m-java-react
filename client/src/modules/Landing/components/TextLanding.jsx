import { Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

const TextLanding = ({ variant, component, text }) => {
  TextLanding.propTypes = {
    variant: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  return (
    <Typography variant={variant} component={component}>
      {text}
    </Typography>
  );
};

export default TextLanding;
