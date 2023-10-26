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
import { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';

const NameSetting = () => {
  NameSetting.propTypes = {};

  const [originalData, setOriginalData] = useState();
  const [isEditing, setIsEditing] = useState(false);
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
      name: '',
      last_name: '',
    },
  });

  const { handleSubmit, watch, reset, setValue } = methods;

  const isOriginalData = () => {
    if (JSON.stringify(originalData) !== JSON.stringify(watch())) return false;
    return true;
  };

  const { getDataUser } = useUser();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { name, last_name } = await getDataUser(2);

        setValue('name', name);
        setValue('last_name', last_name);

        setOriginalData({ name, last_name });
        setResponse({ success: true, loading: false, error: null });
      } catch {
        setResponse({ success: null, loading: false, error: true });
      }
    };

    getUser();
  }, [getDataUser, setValue]);

  const { partialUpdateUser } = useUser();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = await partialUpdateUser(2, data);
      const { name, last_name } = res.data;
      setOriginalData({ name, last_name });
    } catch {
      setError(true);
      reset(originalData);
    } finally {
      setIsEditing(false);
      setLoading(false);
      handleOpenAlert();
    }
  });

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

      <Typography variant='h6'>Información de Usuario</Typography>
      <Typography mb={3}>
        Gestiona y actualiza tus datos personales desde esta sección
      </Typography>

      {response.loading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto' }} />
      ) : response.success ? (
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
                      reset(originalData);
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
      ) : (
        <Typography component='h4' color='error'>
          Ocurrió un error, intente mas tarde
        </Typography>
      )}
    </Box>
  );
};

export default NameSetting;
