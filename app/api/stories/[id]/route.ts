
import { NextResponse } from "next/server";
import { api } from "../../api"; 
import { cookies } from "next/headers";
import { logErrorResponse } from "../../_utils/utils";
import { isAxiosError } from "axios";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;


    if (!id || id === 'undefined') {
      return NextResponse.json({ error: "Story ID is missing" }, { status: 400 });
    }

    
    const res = await api(`/stories/${id}`, {
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
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function PATCH() {}
