// import { NextResponse } from 'next/server';
// import { api } from '../../api';
// import { cookies } from 'next/headers';
// import { isAxiosError } from 'axios';

// export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await params;
//     const { searchParams } = new URL(request.url);
//     const cookieStore = await cookies();

//     const res = await api.get(`/users/${id}`, {
//       params: Object.fromEntries(searchParams),
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });

//     return NextResponse.json(res.data, { status: res.status });
//   } catch (error) {
//     if (isAxiosError(error)) {
//       return NextResponse.json(
//         { error: error.message, response: error.response?.data },
//         { status: error.response?.status || 500 }
//       );
//     }
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // ПЕРЕВІРКА: якщо id порожній або є рядком "undefined", повертаємо 400
    if (!id || id === "undefined") {
      return NextResponse.json(
        { error: "User ID is missing or invalid" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    console.log("FETCHING USER BY ID:", id);

    const res = await api.get(`/users/${id}`, {
      headers: {
        Cookie: cookieString, // Передаємо куки для авторизації на бекенді
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("AXIOS ERROR IN USER ROUTE:");
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);
      
      return NextResponse.json(
        { 
          error: error.message, 
          response: error.response?.data 
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}