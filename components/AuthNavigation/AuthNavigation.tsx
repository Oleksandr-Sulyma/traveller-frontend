'use client';

import Link from 'next/link';
// import css from './AuthNavigation.module.css';

type AuthNavigationProps = {
  mode?: 'desktop' | 'modal';
  onCloseAction?: () => void;
};

export default function AuthNavigation({
  mode = 'desktop',
  onCloseAction,
}: AuthNavigationProps) {
  const handleClick = () => {
    if (onCloseAction) onCloseAction();
  };

  if (mode === 'modal') {
    return (
      <div className={css.modalAuth}>
        <Link
          href="/auth/login"
          className={css.modalLogin}
          onClick={handleClick}
          aria-label="Увійти в акаунт"
        >
          Вхід
        </Link>
        <Link
          href="/auth/register"
          className={css.modalRegister}
          onClick={handleClick}
          aria-label="Зареєструватися"
        >
          Реєстрація
        </Link>
      </div>
    );
  }

  // Desktop mode 
  return (
    <div className={css.desktopAuth}>
      <Link href="/auth/login" className={css.loginButton}>
        Вхід
      </Link>
      <Link href="/auth/register" className={css.registerButton}>
        Реєстрація
      </Link>
    </div>
  );
}
