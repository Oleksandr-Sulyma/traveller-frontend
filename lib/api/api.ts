// import axios from 'axios';

// const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

// const nextServer = axios.create({
//   baseURL,
//   withCredentials: true,
// });

// export default nextServer;

import axios from 'axios';

const nextServer = axios.create({
  baseURL: '/api', // ← через Next.js route handlers
  withCredentials: true,
});

export default nextServer;
