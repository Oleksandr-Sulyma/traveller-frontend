import nextServer from './api';
import { Story, StoryPost } from '@/types/story';
import { User } from '@/types/user';
import { Category } from '@/types/category';
import {
  QueryParams,
  StoryHttpResponse,
  RegisterRequest,
  LoginRequest,
  UsersHttpResponse,
} from '@/types/api';

export const fetchStories = async (params?: QueryParams): Promise<StoryHttpResponse> => {
  const { data } = await nextServer.get('/stories', { params });
  return data;
};

export const fetchAllUsers = async (params?: QueryParams): Promise<UsersHttpResponse> => {
  const { data } = await nextServer.get<UsersHttpResponse>('/users', { params });
  return data;
};

export const getStoryById = async (id: string): Promise<Story> => {
  const { data } = await nextServer.get(`/stories/${id}`);
  return data;
};

export const getOwnStories = async (): Promise<Story[]> => {
  const { data } = await nextServer.get('/stories/own');
  return data;
};

export const getSavedStories = async (): Promise<Story[]> => {
  const { data } = await nextServer.get('/stories/saved');
  return data;
};

export const createStory = async (input: StoryPost): Promise<Story> => {
  const formData = new FormData();
  formData.append('title', input.title);
  formData.append('article', input.article);
  formData.append('category', input.category);
  if (input.img) {
    formData.append('img', input.img as any);
  }

  const { data } = await nextServer.post<Story>('/stories', formData);
  return data;
};

export const updateStory = async (storyId: string, payload: Partial<StoryPost>): Promise<Story> => {
  const { data } = await nextServer.patch(`/stories/${storyId}`, payload);
  return data;
};

export const saveStory = async (storyId: string): Promise<Story> => {
  const { data } = await nextServer.post(`/stories/${storyId}/save`);
  return data;
};

export const register = async (payload: RegisterRequest): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/register', payload);
  return data;
};

export const login = async (payload: LoginRequest): Promise<User> => {
  const { data } = await nextServer.post('/auth/login', payload);
  return data;
};

export const refresh = async () => {
  const { data } = await nextServer.post('/auth/refresh');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const requestResetEmail = async (email: string) => {
  const { data } = await nextServer.post('/auth/reset-email', { email });
  return data;
};

export const resetPassword = async (password: string, token: string) => {
  const { data } = await nextServer.post('/auth/reset-password', { password, token });
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get('/users/me');
  return data;
};

export const getUserById = async (id: string): Promise<User> => {
  const { data } = await nextServer.get(`/users/${id}`);
  return data;
};

export const updateProfile = async (payload: {
  name?: string;
  description?: string;
}): Promise<User> => {
  const { data } = await nextServer.patch('/users/me/profile', payload);
  return data;
};

export const patchAvatarMe = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('avatar', file);

  const { data } = await nextServer.patch('/users/me/avatar', formData);

  return data;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await nextServer.get('/categories');
  return data;
};
