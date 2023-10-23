import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      decimalScale={2}
      thousandSeparator
      prefix='$'
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const AmountInput = ({ sx }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name='amount'
      control={control}
      defaultValue=''
      rules={{
        required: 'El monto es requerido',
        validate: (value) =>
          parseFloat(value) >= 0.01 || 'El monto debe ser mayor o igual a 0.01',
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={sx}
          error={!!error}
          helperText={error ? error.message : null}
          label='Monto'
          variant='outlined'
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      )}
    />
  );
};

AmountInput.propTypes = {
  sx: PropTypes.object.isRequired,
};

export default AmountInput;
