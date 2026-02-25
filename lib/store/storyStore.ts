import { StoryPost } from '@/types/story';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialDraft: StoryPost = {
  title: '',
  article: '',
  img: undefined as unknown as File,
  category: '',
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
