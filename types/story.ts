import { User } from "./user";
import { Category } from "./category"; 

export interface Story {
    _id: string;
    title: string;
    article: string;
    img: string; 
    category: Category;
    ownerId: Pick<User, '_id' | 'name'> & Partial<Pick<User, 'avatarUrl'>>;
    date: string;      
    favoriteCount: number;
    createdAt: string;
    updatedAt: string;
}