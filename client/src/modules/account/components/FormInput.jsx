import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const FormInput = ({ type, name, label, sx, rules, isEditing }) => {
  FormInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    sx: PropTypes.object.isRequired,
    rules: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { control, setValue } = useFormContext();

  const handleBlur = (event) => {
    if (type !== 'password') {
      const trimmedValue = event.target.value.replace(/\s+/g, ' ').trim();

      setValue(name, trimmedValue);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          type={type === 'password' && showPassword ? 'text' : type}
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
          onBlur={handleBlur}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: !isEditing,
            style: {
              outline: 'none',
            },
            endAdornment:
              type === 'password' ? (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
        />
      )}
    />
  );
};

export default FormInput;
