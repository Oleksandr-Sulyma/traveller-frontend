export interface Category {
  id: string;
  name: string;
}

export interface Owner {
  id: string;
  name: string;
  avatarUrl: string;
}

// export interface Story {
//   id: string;
//   title: string;
//   article: string;
//   img: string;
//   category: Category;
//   owner: Owner;
//   date: string;
//   favoriteCount: number;
//   createdAt: string;
//   updatedAt: string;
// }

// export type StoryPost = {
//   title: string;
//   article: string;
//   category: string;
//   img: File;
// };

export interface Story {
  _id: string;        // У Swagger це _id
  title: string;
  article: string;
  img: string;        // Тут ок
  category: {
    _id: string;
    name: string;
  };
  ownerId: {          // У Swagger це ownerId, а не owner
    _id: string;
    name: string;
    avatarUrl: string;
  };
  favoriteCount: number;
  formattedDate: string; // Swagger повертає вже відформатовану дату
  createdAt: string;
  updatedAt: string;
}