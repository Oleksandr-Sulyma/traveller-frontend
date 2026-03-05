'use client';

import Link from 'next/link';
import css from './AuthNavigation.module.css';
import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type AuthNavigationProps = {
  mode?: 'desktop' | 'modal';
  onCloseAction?: () => void;
  isLoggedIn?: boolean;
};

export default function AuthNavigation({
  mode = 'desktop',
  onCloseAction,
  isLoggedIn = false,
}: AuthNavigationProps) {
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
    clearIsAuthenticated();
    queryClient.removeQueries({ queryKey: ['me'] });
    onCloseAction?.();
    router.push('/');
  };

  // 1. СТАН: КОРИСТУВАЧ АВТОРИЗОВАНИЙ
  if (isLoggedIn) {
    return (
      <div className={mode === 'modal' ? css.modalAuth : css.desktopAuth}>
        <div className={css.userInfo}>
          <div className={css.avatarPlaceholder}>
             {/* Тут буде Image або перша літера імені */}
             М
          </div>
          <span className={css.userName}>Мандрівник</span>
        </div>
        <button 
          className={css.logoutButton} 
          onClick={handleLogout}
          aria-label="Вийти з системи"
        >
          ➔
        </button>
      </div>
    );
  }

  // 2. СТАН: ГІСТЬ (МОДАЛЬНЕ МЕНЮ / БУРГЕР)
  if (mode === 'modal') {
    return (
      <div className={css.modalAuth}>
        <Link
          href="/sign-in"
          className={css.modalLogin}
          onClick={onCloseAction}
          aria-label="Увійти в акаунт"
        >
          Вхід
        </Link>
        <Link
          href="/sign-up"
          className={css.modalRegister}
          onClick={onCloseAction}
          aria-label="Зареєструватися"
        >
          Реєстрація
        </Link>
      </div>
    );
  }

  // 3. СТАН: ГІСТЬ (ДЕКСTOP ХЕДЕР)
  return (
    <div className={css.desktopAuth}>
      <Link 
        href="/sign-in" 
        className={`${css.loginButton} ${css.authButton}`}
        aria-label="Увійти в акаунт"
      >
        Вхід
      </Link>
      <Link 
        href="/sign-up" 
        className={`${css.registerButton} ${css.authButton}`}
        aria-label="Зареєструватися"
      >
        Реєстрація
      </Link>
    </div>
  );
}