import { cookies } from 'next/headers';
import nextServer from './api';
import { Story } from '@/types/story';
import { User } from '@/types/user';
import { Category } from '@/types/category';
import { QueryParams, StoryHttpResponse, UsersHttpResponse } from '@/types/api';
import { CheckSessionResponse} from "@/types/auth"
import { AxiosResponse, InternalAxiosRequestConfig, AxiosResponseHeaders } from 'axios';

/* =========================
HELPER
========================= */

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

/* =========================
STORIES
========================= */

export const fetchStories = async (params?: QueryParams): Promise<StoryHttpResponse> => {
  const headers = await getAuthHeaders();

  const { data } = await nextServer.get('/stories', {
    params,
    headers,
  });
  return  data;
}
 


export const getStoryById = async (id: string): Promise<Story> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get(`/stories/${id}`, { headers });
  return data;
};

export const getOwnStories = async (): Promise<Story[]> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get('/stories/own', { headers });
  return data;
};

export const getSavedStories = async (): Promise<Story[]> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get('/stories/saved', { headers });
  return data;
};

/* =========================
USERS
========================= */

export const fetchAllUsers = async (params?: QueryParams): Promise<UsersHttpResponse> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get<UsersHttpResponse>('/users', {
    params,
    headers,
  });
  return data;
};

export const getMe = async (): Promise<User | null> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await nextServer.get('/users/me', { headers });
    return data;
  } catch (error) {
    return null;
  }
};


export const getUserById = async (id: string): Promise<User> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get(`/users/${id}`, { headers });
  return data;
};

export const getUserPrivateData = async (id: string): Promise<{user: User, stories: Story[], savedStories: Story[]}> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get(`/users/${id}/private`, { headers });
  return data;
};

/* =========================
CATEGORIES
========================= */

export const fetchCategories = async (): Promise<Category[]> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get('/categories', { headers });
  return data;
};

/* =========================
SESSION CHECK
========================= */

export const checkServerSession = async (): Promise<AxiosResponse<CheckSessionResponse | null>> => {
  try {
    const headers = await getAuthHeaders();
    return await nextServer.get('/auth/check', { headers });
  } catch (error: any) {
    return { data: null, status: error.response?.status || 401 } as AxiosResponse;
  }
};
