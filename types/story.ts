export interface Category {
  id: string;
  name: string;
}

export interface Owner {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Story {
  id: string;
  title: string;
  article: string;
  img: string;
  category: Category;
  ownerId: Owner;
  date: string;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
}

export type StoryPost = {
  title: string;
  article: string;
  category: string;
  img: File;
};
