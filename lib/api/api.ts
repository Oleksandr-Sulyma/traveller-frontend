import axios from 'axios';

const nextServer = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true, 
});

export default nextServer;