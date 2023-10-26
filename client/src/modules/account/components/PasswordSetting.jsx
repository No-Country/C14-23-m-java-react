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
import { useUser } from '../../../context/UserContext';

const PasswordSetting = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseAlert = () => setAlert(false);
  const handleOpenAlert = () => setAlert(true);

  const methods = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const { updateUserPassword } = useUser();

  const { handleSubmit, reset, watch } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const { currentPassword, newPassword } = data;
    const newData = { currentPassword, newPassword };
    //Test
    //password userId 1 : Usuario1111#
    //password userId 2 : Usuario2222#

    setLoading(true);
    setError(false);
    const res = await updateUserPassword(2, newData);
    if (res.status === 200) {
      reset();
    } else {
      setError(true);
      if (res.response.request.status === 400) {
        setErrorMessage(res.response.data.message);
      }

      if (res.response.request.status > 400) {
        setErrorMessage('Ocurrió un error, intente mas tarde');
      }
    }
    setLoading(false);
    handleOpenAlert();
  });

  const newPassword = watch('newPassword', '');

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
          {error ? errorMessage : 'Contraseña actualizada correctamente!'}
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
            name='currentPassword'
            label='Contraseña Actual'
            sx={{ mb: 3, width: '100%' }}
            rules={{
              required: 'Contraseña actual es requerida',
              pattern: {
                value:
                  /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/,
                message:
                  "La contraseña debe contener números, letras, símbolos y no debe incluir los siguientes símbolos: /= ¡ ' ? ¿ ´ [ { ] } , ; . : -",
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
            name='newPassword'
            label='Nueva Contraseña'
            sx={{ mb: 3, width: '100%' }}
            rules={{
              required: 'Nueva contraseña es requerida',
              pattern: {
                value:
                  /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+])(?=.*[A-Z])[A-Za-z0-9!@#$%^&*()_+]+$/,
                message:
                  "La contraseña debe contener números, letras (al menos una mayúscula), símbolos y no debe incluir los siguientes símbolos: /= ¡ ' ? ¿ ´ [ { ] } , ; . : -",
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
            name='confirmNewPassword'
            label='Confirmar Nueva Contraseña'
            sx={{ mb: 3, width: '100%' }}
            rules={{
              required: 'Confirmación de nueva contraseña requerida',
              pattern: {
                value:
                  /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+])(?=.*[A-Z])[A-Za-z0-9!@#$%^&*()_+]+$/,
                message:
                  "La contraseña debe contener números, letras (al menos una mayúscula), símbolos y no debe incluir los siguientes símbolos: /= ¡ ' ? ¿ ´ [ { ] } , ; . : -",
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
