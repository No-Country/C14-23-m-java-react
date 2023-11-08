import axios from './axios';

//Registrar un nuevo usuario
export const registerRequest = (user) => axios.post('/api/auth/register', user);

//Obtener datos de un usuario (login)
export const loginUserRequest = (user) =>
  axios.post(`/api/auth/authenticate`, user);

//Actualizar datos de un usuario
export const updateUserRequest = (id, userInfo) =>
  axios.put(`/api/user/update/${id}`, userInfo);

//Actualizar datos parciales de un usuario
export const partialUpdateUserRequest = (id, data) =>
  axios.patch(`/api/user/update/${id}`, data);

//Actualizar contraseña de un usuario
export const updateUserPasswordRequest = (id, data) =>
  axios.patch(`/api/user/update/password/${id}`, data);

//Eliminar un usuario
export const deleteUserRequest = (id) => axios.delete(`/api/user/${id}`);

//actualizar los ahorros de un usuario
export const updateUserSavings = (idUser, toSaving) =>
  axios.put('/api/savings', { idUser, toSaving });

//volver los ahorros del usuario a 0
export const savingsToZero = (id) =>
  axios.put(`/api/savings/revertState/user/${id}`);
