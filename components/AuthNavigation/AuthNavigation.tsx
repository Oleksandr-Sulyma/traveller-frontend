'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css';

interface AuthNavigationProps {
  mode?: 'desktop' | 'mobile';
}

export default function AuthNavigation({ mode = 'desktop' }: AuthNavigationProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={css.placeholder} />;
  }

  if (isAuthenticated) {
    return (
      <div className={`${css.wrapper} ${css[mode]}`}>
        <span className={css.userName}>{user?.name || 'Мандрівник'}</span>
        <button onClick={() => logout()} className={css.logoutBtn}>
          Вийти
        </button>
      </div>
    );
  }

  return (
    <div className={`${css.authLinks} ${css[mode]}`}>
      <Link 
        href="/sign-in" 
        className={`${css.loginLink} ${pathname === '/sign-in' ? css.active : ''}`}
      >
        Увійти
      </Link>
      <Link 
        href="/sign-up" 
        className={`${css.registerLink} ${pathname === '/sign-up' ? css.active : ''}`}
      >
        Реєстрація
      </Link>
    </div>
  );
}
export default AuthNavModal;
