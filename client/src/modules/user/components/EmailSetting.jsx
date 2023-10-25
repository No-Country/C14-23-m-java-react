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

const EmailSetting = () => {
  EmailSetting.propTypes = {};

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
      email: '',
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
        const { email } = await getDataUser(2);

        setValue('email', email);

        setOriginalData({ email });
        setResponse({ success: true, loading: false, error: null });
      } catch (error) {
        console.log(error);
        setResponse({ success: null, loading: false, error: true });
      }
    };

    getUser();
  }, [getDataUser, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = await new Promise((res, rej) =>
        setTimeout(() => res('ok'), 3000),
      );
      console.log(res);
      setOriginalData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
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

      <Typography mb={2}>Cambiar Correo Electrónico</Typography>
      {response.loading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto' }} />
      ) : response.success ? (
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

export default EmailSetting;
