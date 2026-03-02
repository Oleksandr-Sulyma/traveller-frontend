export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { api } from '../api'; // Переконайся, що шлях до базового api вірний
import { logErrorResponse } from '../_utils/utils';
import { isAxiosError } from 'axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const res = await api.get('/users', { params });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.response?.status || 400 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
