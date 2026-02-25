'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import css from './Header.module.css';
import logo from '@/public/favicon.svg';  

interface HeaderProps {
  isHome?: boolean;
}

export default function Header({ isHome = false }: HeaderProps) {
  const currentPath = usePathname();

  // ==== Работа с темой ====
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Не рендерим до монтирования клиента (чтобы избежать "глазков")
  if (!mounted) return null;

  return (
    <header className={`${css.header} ${isHome ? css.isHome : ''}`}>
      <div className={css.container}>
        {/* ==== ЛОГО ==== */}
        <Link href="/" aria-label="На головну" className={css.logoLink}>
          <Image
            src={logo}
            width={22}
            height={22}
            alt="Подорожники — головна сторінка"
            aria-hidden="true"
            className={css.logoIcon}
            priority={isHome}
          />
          <span className={css.logoText}>Подорожники</span>
        </Link>

        {/* ==== НАВИГАЦИЯ ==== */}
        <nav aria-label="Основна навігація" className={css.desktopNav}>
          <ul className={css.navigation}>
            <li>
              <Link
                href="/"
                className={`${css.navigationLink} ${currentPath === '/' ? css.active : ''}`}
              >
                Головна
              </Link>
            </li>
            <li>
              <Link
                href="/stories"
                className={`${css.navigationLink} ${currentPath === '/stories' ? css.active : ''}`}
              >
                Історії
              </Link>
            </li>
            <li>
              <Link
                href="/travellers"
                className={`${css.navigationLink} ${currentPath === '/travellers' ? css.active : ''}`}
              >
                Мандрівники
              </Link>
            </li>
          </ul>

      {/* ==== КНОПКИ АВТОРИЗАЦІЇ + ТЕМНА ТЕМА ==== */}
          <div className={css.actionsGroup}>
            <AuthNavigation mode="desktop" />
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Перемкнути тему"
              className={css.themeToggle}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}



// не мій!!!

/*'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';
import logo from '@/public/favicon.svg';

interface HeaderProps {
  isHome?: boolean;
}

export default function Header({ isHome }: HeaderProps) {
  const pathname = usePathname();
  const isLoggedIn = false; // Тимчасово для прикладу

  return (
    <header className={`${styles.header} ${isHome ? styles.isHome : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        {/* Логотип *}
        <div className={styles.content}>
          <Link href="/" className={styles.logoLink}>
            <Image 
              src={logo} 
              alt="Подорожники логотип" 
              width={23} 
              height={23} 
              priority 
            />
            <span className={styles.logoText}>Подорожники</span>
          </Link>
        </div>

        <div className={styles.columnRight}>
          {/* Навігація *}
          <nav className={styles.navLinks}>
            <Link 
              href="/" 
              className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
            >
              Головна
            </Link>
            <Link 
              href="/stories" 
              className={`${styles.link} ${pathname === '/stories' ? styles.active : ''}`}
            >
              Історії
            </Link>
            <Link 
              href="/destinations" 
              className={`${styles.link} ${pathname === '/destinations' ? styles.active : ''}`}
            >
              Маршрути
            </Link>
          </nav>

          <div className={styles.actions}>
            {/* Перемикач теми *}
            <ThemeToggle />

            {!isLoggedIn ? (
              <>
                {/* Кнопка Увійти - використовуємо класи з нашого buttons.css *}
                <button className={`btn btn--header ${isHome ? 'btn--ghost-white' : 'btn--ghost'}`}>
                  Увійти
                </button>
                
                {/* Кнопка Реєстрація *}
                <button className="btn btn--header btn-primary">
                  Реєстрація
                </button>
              </>
            ) : (
              <div className={styles.profile}>
                {/* Тут буде аватар *}
              </div>
            )}
            
            {/* Кнопка Бургер (мобільне меню) *}
            <button className={styles.btnBurger} aria-label="Відкрити меню">
               <svg width="24" height="24">
                 <use xlinkHref="/sprites/sprite.svg#menu" />
               </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}*/
