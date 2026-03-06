'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
// Важливо: переконайтеся, що шлях до стилів правильний
import css from './AuthNavigation.module.css';

interface AuthNavigationProps {
  mode?: 'desktop' | 'mobile';
}

export default function AuthNavigation({ mode = 'desktop' }: AuthNavigationProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Використовуємо селектор для отримання всього необхідного за один раз
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Захист від Hydration Mismatch
  if (!mounted) {
    // Важливо: переконайтеся, що в .module.css є клас .placeholder
    return <div className={css.placeholder || ''} />;
  }

  // Визначаємо клас режиму безпечно для TypeScript
  const modeClass = mode === 'mobile' ? css.mobile : css.desktop;

  if (isAuthenticated) {
    return (
      <div className={`${css.wrapper || ''} ${modeClass || ''}`}>
        <span className={css.userName}>{user?.name || 'Мандрівник'}</span>
        <button 
          onClick={() => logout()} 
          className={css.logoutBtn}
          type="button"
        >
          Вийти
        </button>
      </div>
    );
  }

  return (
    <div className={`${css.authLinks || ''} ${modeClass || ''}`}>
      <Link 
        href="/sign-in" 
        className={`${css.loginLink || ''} ${pathname === '/sign-in' ? css.active : ''}`}
      >
        Увійти
      </Link>
      <Link 
        href="/sign-up" 
        className={`${css.registerLink || ''} ${pathname === '/sign-up' ? css.active : ''}`}
      >
        Реєстрація
      </Link>
    </div>
  );
}
