import axios from 'axios';

const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, 
});

export default nextServer;