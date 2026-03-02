import { cookies } from 'next/headers';
import nextServer from './api';
import { Story } from '@/types/story';
import { User } from '@/types/user';
import { Category } from '@/types/category';
import { QueryParams, StoryHttpResponse } from '@/types/api';
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

  return data;
};

// export const fetchStories = async (params?: QueryParams) => {
//   try {
//     // const headers = await getAuthHeaders();
//     const { data } = await nextServer.get('/stories', { 
//       params, 
//       // headers 
//     });
//     return data;
//   } catch (error: any) {
//     // Цей лог у терміналі покаже справжню причину (наприклад, "Invalid limit value")
//     console.error("BACKEND ERROR DATA:", error.response?.data);
//     throw error;
//   }
// };




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

export const getMe = async (): Promise<User> => {
  const headers = await getAuthHeaders();

  const { data } = await nextServer.get('/users/me', { headers });

  return data;
};

export const getUserById = async (id: string): Promise<User> => {
  const headers = await getAuthHeaders();

  const { data } = await nextServer.get(`/users/${id}`, { headers });

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

// export const checkSession = async () => {
//   const headers = await getAuthHeaders();

//   const { data } = await nextServer.get('/auth/session', { headers });

//   return data;
// };

export const checkServerSession = async (): Promise<AxiosResponse<unknown>> => {
  try {
    const cookieStore = await cookies();
    return await nextServer.get('/auth/session', {
      headers: { Cookie: cookieStore.toString() },
    });
  } catch (error: unknown) {
    return {
      data: null,
      status: 401,
      statusText: 'Unauthorized',
      headers: {} as AxiosResponseHeaders,
      config: {} as InternalAxiosRequestConfig,
    };
  }
};
