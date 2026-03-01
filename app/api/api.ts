import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
