'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

import AuthNavigation from '../AuthNavigation/AuthNavigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

import css from './Header.module.css';
import logo from '@/public/favicon.svg';

interface HeaderProps {
  isHome?: boolean;
}

export default function Header({ isHome = false }: HeaderProps) {
  const currentPath = usePathname();
  const { theme, setTheme } = useTheme();
  const user = useAuthStore(state => state.user);
  const isLoggedIn = !!user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleMenuOverflow = () => {
      document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    };

    window.addEventListener('scroll', handleScroll);
    handleMenuOverflow();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  if (!mounted) return null;

  const navLinks = [
    { name: 'Головна', href: '/' },
    { name: 'Історії', href: '/stories/filter/all' },
    { name: 'Мандрівники', href: '/travellers' },
  ];

  if (isLoggedIn) navLinks.push({ name: 'Мій Профіль', href: '/profile' });

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const headerClasses = `${css.header} ${isHome ? css.isHome : ''} ${isScrolled ? css.isScrolled : ''}`.trim();

  return (
    <header className={headerClasses}>
      <div className={`container ${css.container}`}>
        <Link href="/" className={css.logoLink} onClick={closeMenu}>
          <Image src={logo} width={22} height={22} alt="Логотип Подорожники" priority />
          <span className={css.logoText}>Подорожники</span>
        </Link>

        <nav className={css.desktopNav} aria-label="Основна навігація">
          <ul className={css.navigation}>
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${css.navigationLink} ${currentPath === link.href ? css.active : ''}`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={css.actionsGroup}>
          <div className={css.tabletAuthVisible}>
            <Link href={isLoggedIn ? '/stories/create' : '/sign-up'} className={css.navBtnLink}>
              Опублікувати історію
            </Link>
          </div>

          <div className={css.desktopAuthOnly}>
            <AuthNavigation mode="desktop" />
          </div>

          <div className={css.mobileBurgerOnly}>
            <button
              type="button"
              className={css.burgerButton}
              onClick={toggleMenu}
              aria-label="Відкрити меню"
            >
              <div className={css.burgerLines}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>

          <button
            type="button"
            className={css.themeToggle}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Змінити тему"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>

        {isMenuOpen && <BurgerMenu onCloseAction={closeMenu} isLoggedIn={isLoggedIn} navLinks={navLinks} />}
      </div>
    </header>
  );
}