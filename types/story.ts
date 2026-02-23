import { User } from "./user";
import { Category } from "./category"; 

export interface Story {
    id: string;
    title: string;
    article: string;
    img: string; 
    category: Category;
    ownerId: string;
    date: string;      
    favoriteCount: number;
    createdAt: string;
    updatedAt: string;
}
  
export type StoryPost = Omit<Story, 'id' | 'createdAt' | 'updatedAt' | 'favoriteCount' | 'ownerId' | 'date'>;    