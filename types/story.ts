export interface Owner {
  id: string;
  name: string;
  avatarUrl: string;
}

export type StoryPost = {
  title: string;
  article: string;
  category: string;
  img: File;
};

export interface Story {
  id: string;
  title: string;
  article: string;
  img: string;
  category: {
    id: string;
    name: string;
  };
  ownerId: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  favoriteCount: number;
  formattedDate: string;
  createdAt: string;
  updatedAt: string;
}

export type StoryUpdate = Partial<Omit<StoryPost, 'img'>> & {
  img?: File | string;
};
