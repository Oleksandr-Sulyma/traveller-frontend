export interface Owner {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface StoryCategory {
  id: string;
  name: string;
}

export interface Story {
  id: string;
  title: string;
  article: string;
  img: string;
  category: StoryCategory; 
  ownerId: Owner;           
  favoriteCount: number;
  formattedDate: string;  
  createdAt: string;
  updatedAt: string;
}

export type StoryPost = {
  title: string;
  article: string;
  category: string; 
  img: File;      
};

export type StoryUpdate = Partial<Omit<StoryPost, 'img'>> & {
  img?: File | string;
};