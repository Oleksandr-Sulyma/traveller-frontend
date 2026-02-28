export interface Story {
  id: string;
  title: string;
  article: string;
  img: string; // URL/path returned from backend
  category: string;
  ownerId: string;
  date: string;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
}

export type StoryPost = {
  title: string;
  article: string;
  category: string;
  img: File; // file that we send via multipart/form-data
};

