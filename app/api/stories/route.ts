export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api'
import { cookies } from 'next/headers';
import { logErrorResponse } from '../_utils/utils';
import { isAxiosError } from 'axios';

// export async function GET(request: NextRequest) {
//   try {
//     const cookieStore = await cookies();
//     const { searchParams } = new URL(request.url);

//     const params = Object.fromEntries(searchParams.entries());

//     const res = await api.get('/stories', {
//       params,
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });

//     return NextResponse.json(res.data, { status: res.status });

//   } catch (error) {
//     if (isAxiosError(error)) {
//       logErrorResponse(error.response?.data);
//       return NextResponse.json(
//         { error: error.message, response: error.response?.data },
//         { status: error.response?.status || 500 }
//       );
//     }

//     logErrorResponse({ message: (error as Error).message });
//     return NextResponse.json(
//       { error: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
    
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    // ЛОГ ПЕРЕД ЗАПИТОМ
    console.log("FETCHING FROM BACKEND:", api.defaults.baseURL + '/stories', "WITH PARAMS:", params);

    const res = await api.get('/stories', {
      params,
      headers: {
        Cookie: cookieString,
      },
    });

    return NextResponse.json(res.data, { status: res.status });

  } catch (error: any) {
    // ДЕТАЛЬНИЙ ЛОГ У ТЕРМІНАЛІ
    console.error("AXIOS ERROR IN ROUTE:");
    if (isAxiosError(error)) {
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
        console.error("URL:", error.config?.url);
        
        return NextResponse.json(
          { 
            error: error.message, 
            backendData: error.response?.data 
          },
          { status: error.response?.status || 500 }
        );
    }

    console.error("UNKNOWN ERROR:", error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}