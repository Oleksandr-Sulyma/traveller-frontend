"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
    children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore(
        (state) => state.clearIsAuthenticated
    );

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const isAuthenticated = await checkSession();

                if (isAuthenticated) {
                    const user = await getMe();
                    if (user) {
                        setUser(user);
                    }
                } else {
                    clearIsAuthenticated();
                }
            } catch (error) {
                console.error("Auth initialization failed:", error);
                clearIsAuthenticated();
            }
        };

        fetchUser();
    }, [setUser, clearIsAuthenticated]);

    return children;
}