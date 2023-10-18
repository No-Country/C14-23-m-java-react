import axios from './axios';

//Obtener todos los ingresos
export const getIncomes = async () => axios.get('/user/income');

//Agregar un nuevo ingreso
export const addIncome = async (income) => axios.post('/user/income', income);

//Eliminar un ingreso
export const deleteIncome = async (id) => axios.delete(`/user/income/${id}`);
