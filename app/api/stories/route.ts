export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api'
import { cookies } from 'next/headers';
import { logErrorResponse } from '../_utils/utils';
import { isAxiosError } from 'axios';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const { searchParams } = new URL(request.url);

    const params = Object.fromEntries(searchParams.entries());

    const res = await api.get('/stories', {
      params,
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });

  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}