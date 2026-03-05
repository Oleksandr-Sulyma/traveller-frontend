import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../../api';
import { logErrorResponse } from '../../../_utils/utils';
import { isAxiosError } from 'axios';

async function getCookieString() {
  const cookieStore = await cookies();
  return cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
}

// Зберегти історію
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const cookieString = await getCookieString();
    const res = await api.post(`/stories/${id}/save`, null, {
      headers: { Cookie: cookieString },
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
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Видалити зі збережених
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const cookieString = await getCookieString();
    const res = await api.delete(`/stories/${id}/save`, {
      headers: { Cookie: cookieString },
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
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}