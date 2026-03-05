import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST() {
  const cookieStore = await cookies();

  try {
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const sessionId = cookieStore.get('sessionId')?.value;

    await api.post('/auth/logout', null, {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}; sessionId=${sessionId}`,
      },
    });
  } catch (error) {
    // Логуємо помилку, але все одно чистимо куки на клієнті
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
    } else {
      logErrorResponse({ message: (error as Error).message });
    }
  }

  // Завжди видаляємо всі три куки, незалежно від відповіді сервера
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('sessionId');

  return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
}
