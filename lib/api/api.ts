import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const cleanedBaseURL = BASE_URL.replace(/\/$/, '') + '/api';

const nextServer = axios.create({
  baseURL: cleanedBaseURL,
  withCredentials: true,
});

export default nextServer;
