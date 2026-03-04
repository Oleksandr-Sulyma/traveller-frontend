import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  updateUser: (data: Partial<User>) => void;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  updateUser: (data: Partial<User>) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
  setUser: (user: User) => set(() => ({ user, isAuthenticated: true })),
  clearIsAuthenticated: () =>
    set(() => ({ user: null, isAuthenticated: false })),
}));
