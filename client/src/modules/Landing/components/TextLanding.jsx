import { Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

const TextLanding = ({ variant, component, text }) => {
  return (
    <Typography variant={variant} component={component}>
      {text}
    </Typography>
  );
};

export default TextLanding;

TextLanding.propTypes = {
  variant: PropTypes.string.isRequerid,
  component: PropTypes.string.isRequerid,
  text: PropTypes.string.isRequerid,
};
