import axios from './axios';

//Registrar un nuevo usuario
export const registerRequest = (user) => axios.post('/api/register', user);

//Obtener datos de un usuario
export const dataUserRequest = (id) => axios.get(`/api/user/${id}`);

//Actualizar datos de un usuario
export const updateUserRequest = (id, userInfo) =>
  axios.put(`/api/user/update/${id}`, userInfo);

//Eliminar un usuario
export const deleteUserRequest = (id) => axios.delete(`/api/user/${id}`);

//actualizar los ahorros de un usuario
export const updateUserSavings = ( idUser, toSaving ) =>
  axios.put('/api/savings',idUser,toSaving)

