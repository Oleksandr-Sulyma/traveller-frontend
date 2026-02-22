import { cookies } from 'next/headers';
import { nextServer } from './api';

export const checkServerSession = async () => {

  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {

      Cookie: cookieStore.toString(),
    },
  });

  return res;
};