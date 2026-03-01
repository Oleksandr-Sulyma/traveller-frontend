
import { Story } from '@/types/story';

export interface QueryParams {
  page?: number;
  perPage?: number;
  favorite?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface StoryHttpResponse {
  stories: Story[];
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
