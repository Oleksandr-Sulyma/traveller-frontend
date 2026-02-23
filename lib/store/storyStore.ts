import { StoryPost } from '@/types/story';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Category } from '@/types/category';

const initialDraft: StoryPost = {
    title: '',
    article: '',
    img: '',
    category: Category.Europe, 
};

interface StoryDraftStore {
  draft: StoryPost;
  setDraft: (story: StoryPost) => void;
  clearDraft: () => void;
}

export const useStoryDraftStore = create<StoryDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: story => set(() => ({ draft: story })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: 'story-draft', partialize: state => ({ draft: state.draft }) }
  )
);
