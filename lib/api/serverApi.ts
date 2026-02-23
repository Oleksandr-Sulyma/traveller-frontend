import { cookies } from "next/headers";
import nextServer from "./api";
import { Story } from "@/types/story";
import { User } from "@/types/user";
import { StoryHttpResponse } from "./clientApi";

export default async function fetchStoryServer(
  query: string,
  page: number,
): Promise<StoryHttpResponse> {
  const cookieStore = await cookies();

  const response = await nextServer.get<StoryHttpResponse>("/stories", {
    params: {
      search: query,
      page,
      perPage: 12,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function fetchStoryByIdServer(id: string): Promise<Story> {
  const cookieStore = await cookies();

  const responseById = await nextServer.get<Story>(`/stories/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return responseById.data;
}

export const getMeServer = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};