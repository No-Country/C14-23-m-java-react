import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

const FormInput = ({ type, name, label, sx, rules, isEditing }) => {
  FormInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    sx: PropTypes.object.isRequired,
    rules: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
  };

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          type={type}
          {...field}
          sx={{
            ...(isEditing
              ? {}
              : {
                  bgcolor: '#f5f5f5',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                  '& .MuiInputLabel-outlined.Mui-focused': {
                    color: 'inherit',
                  },
                  '& .MuiInputBase-input': {
                    opacity: 0.7,
                  },
                }),
            ...sx,
          }}
          error={!!error}
          helperText={error ? error.message : null}
          label={label}
          variant='outlined'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: !isEditing,
            style: {
              outline: 'none',
            },
          }}
        />
      )}
    />
  );
};

export default FormInput;
