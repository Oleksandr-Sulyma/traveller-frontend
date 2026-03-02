import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

nextServer.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default nextServer;
