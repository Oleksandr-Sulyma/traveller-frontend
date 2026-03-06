import { Story } from './story';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  articlesAmount: number;
  description: string;
  savedStories: Story[];
  createdAt: string;
  updatedAt: string;
}
