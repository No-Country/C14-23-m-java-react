import axios from 'axios';

const instance = axios.create({
  baseURL:"https://cashflowapp.up.railway.app",
  withCredentials: true,
});

export default instance;
