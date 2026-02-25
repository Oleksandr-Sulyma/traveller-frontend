// 22.02.26 - тут нічого не змінювати!!!

import axios from 'axios';

export const api = axios.create({
  baseURL: 'traveller-backend-lia1.onrender.com',
  withCredentials: true,
});
