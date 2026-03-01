import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

const nextServer = axios.create({
  baseURL: 'https://traveller-backend-lia1.onrender.com/',
  withCredentials: true,
});

export default nextServer;
