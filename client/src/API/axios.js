import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://finanzas.up.railway.app',
  withCredentials: true,
});

export default instance;
