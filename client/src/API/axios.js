import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://security2.up.railway.app',
  withCredentials: true,
});

export default instance;
