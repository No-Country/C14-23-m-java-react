import axios from './axios';

//Obtener todos los ingresos
export const getIncomes = async (userId) => axios.get(`user/${userId}/list/income`);

//Obtener ingresos filtrados
export const getFilteredIncomes = async (userId, filters) => axios.patch(`/user/income/month/${userId}`, filters);

//Agregar un nuevo ingreso
export const addIncome = async (income) => axios.post('/user/income', income);

//Eliminar un ingreso
export const deleteIncome = async (id) => axios.delete(`/user/income/${id}`);
