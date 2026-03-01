import axios from 'axios';

const nextServer = axios.create({
  baseURL: 'https://traveller-backend-lia1.onrender.com/',
  withCredentials: true,
});

export default nextServer;
