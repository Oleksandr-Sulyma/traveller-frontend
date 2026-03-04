export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { logErrorResponse } from '../_utils/utils';
import { isAxiosError } from 'axios';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await api.get('/categories', {
      headers: {
        Cookie: cookieStore
          .getAll()
          .map(c => `${c.name}=${c.value}`)
          .join('; '),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    console.error('sdfsdfsdfsd AXIOS ERROR IN ROUTE:');
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 400 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
