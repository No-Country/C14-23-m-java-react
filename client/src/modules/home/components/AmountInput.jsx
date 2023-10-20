import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { PropTypes } from 'prop-types';

function AmountInput({ name, defaultValue, sx }) {
  AmountInput.propTypes = {
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    sx: PropTypes.object.isRequired,
  };

  const { control } = useFormContext();

  const handleInputChange = (event) => {
    const cursorPosition = event.target.selectionStart;
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/,/g, '');
    let [integer, decimal] = numericValue.split('.');

    if (decimal && decimal.length > 2) {
      decimal = decimal.slice(0, 2);
    }

    if (integer !== '0') {
      integer = Number(integer).toString();
    }

    if (inputValue === '') {
      integer = '';
    }

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const finalValue =
      decimal !== undefined ? `${integer}.${decimal}` : integer;

    if (!isNaN(finalValue.replace(/,/g, ''))) {
      const diff = finalValue.length - inputValue.length;
      event.target.value = finalValue;
      event.target.selectionStart = event.target.selectionEnd =
        cursorPosition + diff;
    }
  };

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (
      !/[\d.]/.test(keyValue) ||
      (keyValue === '.' && event.target.value.includes('.'))
    ) {
      event.preventDefault();
    }
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData('text');
    if (!/^\d*(\.\d{0,2})?$/.test(pasteData)) {
      event.preventDefault();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: 'La cantidad es requerida',
        validate: {
          validNumber: (value) => {
            const validationPattern = /^\d{1,3}(,\d{3})*(\.\d{0,2})?$/;
            const isValidNumber = validationPattern.test(value);
            const isGreaterThanOrEqualToMin =
              Number(value.replace(/,/g, '')) >= 0.01;
            return (
              (isValidNumber && isGreaterThanOrEqualToMin) ||
              'La cantidad debe ser igual o mayor a 0.01'
            );
          },
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={sx}
          {...field}
          type='text'
          error={!!error}
          helperText={error ? error.message : null}
          label='Monto'
          inputProps={{
            inputMode: 'numeric',
          }}
          onInput={handleInputChange}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
        />
      )}
    />
  );
}

export default AmountInput;
