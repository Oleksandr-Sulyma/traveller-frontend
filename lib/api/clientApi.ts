import { User } from '@/types/user';
import nextServer from './api';
import { Story, StoryPost } from '@/types/story';
import { Category } from '@/types/category';

export interface StoryHttpResponse {
  stories: Story[];
  totalPages: number;
}

export default async function fetchStories(
  query: string,
  page: number
): Promise<StoryHttpResponse> {
  const response = await nextServer.get<StoryHttpResponse>('/stories', {
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

export async function createStory(input: StoryPost): Promise<Story> {
  const formData = new FormData();
  formData.append('title', input.title);
  formData.append('article', input.article);
  formData.append('category', input.category);
  formData.append('img', input.img as any);

  const postResponse = await nextServer.post<Story>('/stories', formData, {
    withCredentials: true,
    headers: {
      // не указываем Content-Type, браузер сам выставит boundary
      authorization: '4JPnXgAiLAaCNQzOnf0tOz37/gznEAU3yhppTISm',
    },
  });
  return postResponse.data;
}

export async function deleteStory(id: string): Promise<Story> {
  const deleteResponse = await nextServer.delete<Story>(`/stories/${id}`);
  return deleteResponse.data;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// export interface UserRegister {
//   username: string;
//   email: string;
// }

export async function register(data: RegisterRequest) {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
}

export async function login(data: LoginRequest) {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
}

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

interface CheckSessionRequest {
  success: boolean;
}

export async function checkSession() {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
}

export const getMe = async () => {
  const res = await nextServer.get<User>('/users/me');
  return res.data;
};

export interface UpdateUserRequest {
  username: string;
}

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};

export const fetchCategories = async (): Promise<Array<Category>> => {
  const res = await nextServer.get<Array<Category>>('/categories');
  return res.data;
};
