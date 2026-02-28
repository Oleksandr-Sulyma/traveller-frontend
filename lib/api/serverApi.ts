import { cookies } from 'next/headers';
import nextServer from './api';
import { Story, StoryPost } from '@/types/story';
import { User } from '@/types/user';
import { Category } from '@/types/category';
import { QueryParams, StoryHttpResponse } from './clientApi';

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

  const { data } = await nextServer.get('/', { headers });

  return data;
};

/* =========================
SESSION CHECK
========================= */

export const checkSession = async () => {
  const headers = await getAuthHeaders();

  const { data } = await nextServer.get('/auth/session', { headers });

  return data;
};
