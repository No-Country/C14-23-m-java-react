import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from './FormInput';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

const EmailSetting = ({ data, handleUpdate }) => {
  EmailSetting.propTypes = {
    data: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
  };

  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    defaultValues: data,
  });

  const { handleSubmit, watch, reset } = methods;

  const isOriginalData = () => {
    if (JSON.stringify(data) !== JSON.stringify(watch())) return false;
    return true;
  };

  const onSubmit = handleSubmit(handleUpdate);

  return (
    <Box>
      <Typography variant='h6'>Cambiar Correo Electrónico</Typography>
      <Typography mb={3}>
        Gestiona tu correo electrónico para mantener tu información de contacto
        actualizada.
      </Typography>
      <FormProvider {...methods}>
        <Box component='form' onSubmit={onSubmit}>
          <FormInput
            type='text'
            name='email'
            label='Email'
            sx={{ mb: 3, width: '100%' }}
            rules={{
              required: 'Email es requerido',
              pattern: {
                value:
                  /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: 'El email no es valido',
              },
              minLength: {
                value: 18,
                message: 'Debe ser mayor a 18 caracteres',
              },
              maxLength: {
                value: 255,
                message: 'Debe ser menor a 255 caracteres',
              },
            }}
            isEditing={isEditing}
          />

          <Box sx={{ textAlign: 'right' }}>
            {isEditing ? (
              <>
                <Button
                  variant='contained'
                  color='error'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing(false);
                    reset(data);
                  }}
                >
                  Cancelar
                </Button>

                <Button
                  sx={{ ml: 2 }}
                  variant='contained'
                  type='submit'
                  disabled={isOriginalData()}
                >
                  Guardar
                </Button>
              </>
            ) : (
              <Button
                sx={{ ml: 2 }}
                variant='contained'
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
              >
                Editar
              </Button>
            )}
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default EmailSetting;
