import { Story } from './story';
import { User } from './user';

export interface QueryParams {
  page?: number;
  perPage?: number;
  category?: string;
  author?: string;
  favorite?: 'true' | 'false';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface StoryHttpResponse {
  stories: Story[];
  totalPages: number;
}

export interface UsersHttpResponse {
  users: User[];
  totalPages: number;
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
