import { User } from "@/types/user";
import nextServer from "./api";
import { Story } from "@/types/story";

export interface StoryHttpResponse {
  stories: Story[];
  totalPages: number;
}

export default async function fetchStories(
  query: string,
  page: number,
): Promise<StoryHttpResponse> {
  const response = await nextServer.get<StoryHttpResponse>("/stories", {
    params: {
      search: query,
      page,
      perPage: 12,
    },
  });

  return response.data;
}

export async function fetchStoryById(id: string): Promise<Story> {
  const responseById = await nextServer.get<Story>(`/stories/${id}`);
  return responseById.data;
}

export interface CreateStoryPost {
  title: string;
  article: string;
}

export async function createStory({
  title,
  article,
}: CreateStoryPost): Promise<Story> {
  const postResponse = await nextServer.post<Story>("/stories", {
    title,
    article,
  });
  return postResponse.data;
}

export async function deleteStory(id: string): Promise<Story> {
  const deleteResponse = await nextServer.delete<Story>(`/stories/${id}`);
  return deleteResponse.data;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

// export interface UserRegister {
//   username: string;
//   email: string;
// }

export async function register(data: RegisterRequest) {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: RegisterRequest) {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

interface CheckSessionRequest {
  success: boolean;
}

export async function checkSession() {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}

export const getMe = async () => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export interface UpdateUserRequest {
  username: string;
}

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
