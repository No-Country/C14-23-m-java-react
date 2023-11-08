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
      isAllowed={(values) => {
        const { floatValue } = values;
        return isNaN(floatValue) || floatValue < 1000000000000;
      }}
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const AmountInput = ({ sx, name = 'amount', label = 'Monto', validations }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      rules={{
        required: `El ${label} es requerido`,
        validate: {
          minValue: (value) =>
            parseFloat(value) >= 0.01 ||
            `El ${label} debe ser mayor o igual a 0.01`,
          ...validations,
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={sx}
          error={!!error}
          helperText={error ? error.message : null}
          label={label}
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
  sx: PropTypes.object,
  validations: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default AmountInput;
