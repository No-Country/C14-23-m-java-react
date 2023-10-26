import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from './FormInput';
import { useState } from 'react';

const PasswordSetting = () => {
  PasswordSetting.propTypes = {};

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState({
    success: null,
    loading: true,
    error: null,
  });

  const handleCloseAlert = () => setAlert(false);
  const handleOpenAlert = () => setAlert(true);

  const methods = useForm({
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  });

  const { handleSubmit, reset, watch } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const newData = {
      current_password: data.current_password,
      new_password: data.new_password,
    };

    setLoading(true);
    try {
      const res = await new Promise((res, rej) =>
        setTimeout(() => res('pass ok'), 3000),
      );

      console.log(newData);
      console.log(res);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
      handleOpenAlert();
      reset();
    }
  });

  const newPassword = watch('new_password', '');

  return (
    <Box>
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}

      <Snackbar
        open={alert}
        onClose={handleCloseAlert}
        autoHideDuration={error ? 8000 : 3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          variant='standard'
          severity={error ? 'error' : 'success'}
          color={error ? 'error' : 'success'}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={handleCloseAlert}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          {error
            ? 'Ocurrió un error, intente mas tarde'
            : 'Datos guardados exitosamente!'}
        </Alert>
      </Snackbar>

      <Typography variant='h6'>Cambiar Contraseña</Typography>
      <Typography mb={3}>
        Actualiza tu contraseña para mantener segura tu cuenta.
      </Typography>

      <FormProvider {...methods}>
        <Box component='form' onSubmit={onSubmit}>
          <FormInput
            type='password'
            name='current_password'
            label='Contraseña Actual'
            sx={{ mb: 3, width: '100%' }}
            rules={{
              required: 'Contraseña actual es requerida',
              pattern: {
                value:
                  /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/,
                message:
                  "La contraseña debe contener letras, símbolos y no debe incluir los siguientes símbolos: /= ¡ ' ? ¿ ´ [ { ] } , ; . : -",
              },
              minLength: {
                value: 8,
                message: 'Debe ser mayor a 8 caracteres',
              },
              maxLength: {
                value: 45,
                message: 'Debe ser menor a 45 caracteres',
              },
            }}
            isEditing={true}
          />

          <FormInput
            type='password'
            name='new_password'
            label='Nueva Contraseña'
            sx={{ mb: 3, width: '100%' }}
            rules={{
              required: 'Nueva contraseña es requerida',
              pattern: {
                value:
                  /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/,
                message:
                  "La contraseña debe contener letras, símbolos y no debe incluir los siguientes símbolos: /= ¡ ' ? ¿ ´ [ { ] } , ; . : -",
              },
              minLength: {
                value: 8,
                message: 'Debe ser mayor a 8 caracteres',
              },
              maxLength: {
                value: 45,
                message: 'Debe ser menor a 45 caracteres',
              },
            }}
            isEditing={true}
          />

          <FormInput
            type='password'
            name='confirm_new_password'
            label='Confirmar Nueva Contraseña'
            sx={{ mb: 3, width: '100%' }}
            rules={{
              required: 'Confirmación de nueva contraseña requerida',
              pattern: {
                value:
                  /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/,
                message:
                  "La contraseña debe contener letras, símbolos y no debe incluir los siguientes símbolos: /= ¡ ' ? ¿ ´ [ { ] } , ; . : -",
              },
              minLength: {
                value: 8,
                message: 'Debe ser mayor a 8 caracteres',
              },
              maxLength: {
                value: 45,
                message: 'Debe ser menor a 45 caracteres',
              },
              validate: (value) =>
                value === newPassword || 'Las contraseñas no coinciden',
            }}
            isEditing={true}
          />

          <Box sx={{ textAlign: 'right' }}>
            <Button
              sx={{ ml: 2 }}
              variant='contained'
              type='submit'
              disabled={false}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default PasswordSetting;
