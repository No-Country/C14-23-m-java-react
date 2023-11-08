import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from './FormInput';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

const NameSetting = ({ data, handleUpdate }) => {
  NameSetting.propTypes = {
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
      <Typography variant='h6'>Información de Usuario</Typography>
      <Typography mb={3}>
        Gestiona y actualiza tus datos personales desde esta sección
      </Typography>

      <FormProvider {...methods}>
        <Box component='form' onSubmit={onSubmit}>
          <FormInput
            type='text'
            name='name'
            label='Nombre'
            sx={{ mb: 3, width: '100%' }}
            rules={{
              required: 'Nombre es requerido',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Solo se permiten caracteres alfabéticos y espacios',
              },
              minLength: {
                value: 2,
                message: 'Debe ser mayor a 2 caracteres',
              },
              maxLength: {
                value: 45,
                message: 'Debe ser menor a 45 caracteres',
              },
              validate: (value) => {
                const trimmedValue = value.replace(/\s+/g, ' ').trim();

                if (trimmedValue === '') {
                  return 'El campo Nombre no puede estar vacío';
                }
                return true;
              },
            }}
            isEditing={isEditing}
          />

          <FormInput
            type='text'
            name='last_name'
            label='Apellido'
            sx={{ mb: 2, width: '100%' }}
            rules={{
              required: 'Apellido es requerido',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Solo se permiten caracteres alfabéticos y espacios',
              },
              minLength: {
                value: 2,
                message: 'Debe ser mayor a 2 caracteres',
              },
              maxLength: {
                value: 45,
                message: 'Debe ser menor a 45 caracteres',
              },
              validate: (value) => {
                if (value.trim() === '') {
                  return 'El campo Apellido no puede estar vacío';
                }
                return true;
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

export default NameSetting;
