import axios from './axios';

//Registrar un nuevo usuario
export const registerRequest = (user) => axios.post('/api/register', user);

//Obtener datos de un usuario
export const dataUserRequest = (id) => axios.get(`/api/user/${id}`);

//Actualizar datos de un usuario
export const updateUserRequest = (id, user) =>
  axios.put(`/api/user/${id}`, user);

//Actualizar datos parciales de un usuario
export const partialUpdateUserRequest = (id, data) =>
  axios.patch(`/api/user/update/${id}`, data);

//Eliminar un usuario
export const deleteUserRequest = (id) => axios.delete(`/api/user/${id}`);
