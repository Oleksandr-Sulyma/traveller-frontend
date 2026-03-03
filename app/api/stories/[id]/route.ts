export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { logErrorResponse } from '../../_utils/utils';
import { isAxiosError } from 'axios';

type Context = {
  params: {
    id: string;
  };
};


export async function GET(
  request: NextRequest,
  { params }: Context
) {
  try {
    const cookieStore = await cookies();

    const res = await api.get(`/stories/${params.id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });

  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        error.response?.data,
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


export async function PATCH(
  request: NextRequest,
  { params }: Context
) {
  try {
    const cookieStore = await cookies();
    const formData = await request.formData(); 

    const res = await api.patch(
      `/stories/${params.id}`,
      formData,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    return NextResponse.json(res.data, { status: res.status });

  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        error.response?.data,
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