// 22.02.26 - тут нічого не змінювати!!!

import axios from 'axios';

export const api = axios.create({
  baseURL: 'traveller-frontend-one.vercel.app',
  withCredentials: true,
});
