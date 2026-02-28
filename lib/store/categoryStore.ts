import { create } from 'zustand';
import { Category } from '@/types/category';
interface CategoryState {
  categories: Array<Category>;
  isLoaded: boolean;
  setCategories: (categories: Array<Category>) => void;
}

export const useCategoryStore = create<CategoryState>(set => ({
  categories: [],
  isLoaded: false,
  setCategories: categories => set({ categories, isLoaded: true }),
}));
