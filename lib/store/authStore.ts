import { create } from "zustand";
import { User } from "@/types/user";
import { persist } from "zustand/middleware";

type AuthStore = {
    isAuthenticated: boolean,
    user: User | null,
    setUser: (user: User) => void,
    clearIsAuthenticated: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            setUser: (user: User) => set({ user, isAuthenticated: true }),
            clearIsAuthenticated: () => set({ user: null, isAuthenticated: false })
        }),
        {
            name: 'auth-store',
            partialize: (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }),
        }
    )
);