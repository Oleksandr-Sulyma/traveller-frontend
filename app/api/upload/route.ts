export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { logErrorResponse } from '../_utils/utils';
import { isAxiosError } from 'axios';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const formData = await request.formData();

    const res = await api.post('/upload', formData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    logErrorResponse({
      message: (error as Error).message,
    });

    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}