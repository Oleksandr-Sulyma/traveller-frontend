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
  const user = useAuthStore((state) => state.user);  
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isLoggedIn = !!user; 

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleMenuOverflow = () => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
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
    { name: 'Історії', href: '/stories' },
    { name: 'Мандрівники', href: '/travellers' },
  ];

  if (isLoggedIn) {
    navLinks.push({ name: 'Мій Профіль', href: '/profile' });
  }

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const headerClasses = `
    ${css.header} 
    ${isHome ? css.isHome : ''} 
    ${isScrolled ? css.isScrolled : ''}
  `.trim();

  return (
    <header className={headerClasses}>
      <div className={`container ${css.container}`}>
        
        {/* LOGO */}
        <Link href="/" className={css.logoLink} onClick={closeMenu}>
          <Image 
            src={logo} 
            width={22} 
            height={22} 
            alt="Логотип Подорожники" 
            priority 
          />
          <span className={css.logoText}>Подорожники</span>
        </Link>

        {/* ДЕСКТОПНА НАВІГАЦІЯ (1440px+) */}
        <nav className={css.desktopNav} aria-label="Основна навігація">
          <ul className={css.navigation}>
            {navLinks.map((link) => (
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
          
          {/* ТАБЛЕТ (768px - 1439px): "Опублікувати історію" */}
          <div className={css.tabletAuthVisible}>
            <Link 
              href={isLoggedIn ? "/stories/create" : "/sign-in"} 
              className={css.navBtnLink}
            >
              Опублікувати історію
            </Link>
          </div>

          {/* ДЕСКТОП (1440px+): AuthNavigation */}
          <div className={css.desktopAuthOnly}>
            <AuthNavigation mode="desktop" isLoggedIn={isLoggedIn} />
          </div>

          {/* МОБІЛЬНА (до 767px): ТІЛЬКИ БУРГЕР */}
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

          {/* ТЕМА (всі екрани) */}
          <button 
            type="button"
            className={css.themeToggle} 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Змінити тему"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>

        {/* БУРГЕР МЕНЮ */}
        {isMenuOpen && (
          <BurgerMenu 
            onCloseAction={closeMenu} 
            isLoggedIn={isLoggedIn} 
            navLinks={navLinks} 
          />
        )}
      </div>
    </header>
  );
}



/*import { useState, useEffect } from 'react';
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
  const user = useAuthStore((state) => state.user);  
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ Исправлено: реальное состояние авторизации
  const isLoggedIn = !!user; 

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  if (!mounted) return null;

  const navLinks = [
    { name: 'Головна', href: '/' },
    { name: 'Історії', href: '/stories' },
    { name: 'Мандрівники', href: '/travellers' },
  ];

  if (isLoggedIn) {
    navLinks.push(
      { name: 'Мій Профіль', href: '/profile' }
      // "Опублікувати історію" НЕ добавляем в navLinks - она отдельно в tablet/desktop
    );
  }

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const headerClasses = `
    ${css.header} 
    ${isHome ? css.isHome : ''} 
    ${isScrolled ? css.isScrolled : ''}
  `.trim();

  return (
    <header className={headerClasses}>
      <div className={`container ${css.container}`}>
        
        {/* LOGO /}
        <Link href="/" className={css.logoLink} onClick={closeMenu}>
          <Image 
            src={logo} 
            width={22} 
            height={22} 
            alt="Logo" 
            priority 
          />
          <span className={css.logoText}>Подорожники</span>
        </Link>

        {/* ДЕСКТОПНА НАВІГАЦІЯ (1440px+) /}
        <nav className={css.desktopNav} aria-label="Основна навігація">
          <ul className={css.navigation}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`${css.navigationLink} ${currentPath === link.href ? css.active : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={css.actionsGroup}>
          
          {/* ТАБЛЕТ (768px - 1439px): Вхід/Реєстрація ИЛИ Опублікувати /}
          <div className={css.tabletAuthVisible}>
            {!isLoggedIn ? (
              <div className={css.tabletGuestActions}>
                <Link href="/sign-in" className={css.navBtnLink}>Вхід</Link>
                <Link href="/sign-up" className={css.navBtnLink}>Реєстрація</Link>
              </div>
            ) : (
              <Link href="/stories/create" className={css.navBtnLink}>
                Опублікувати історію
              </Link>
            )}
          </div>

          {/* ДЕСКТОП (1440px+): AuthNavigation /}
          <div className={css.desktopAuthOnly}>
            <AuthNavigation mode="desktop" isLoggedIn={isLoggedIn} />
          </div>

          {/* ТЕМА (всегда видно) /}
          <button 
            type="button"
            className={css.themeToggle} 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Змінити тему"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>

          {/* БУРГЕР (tablet + mobile) /}
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

        {/* БУРГЕР МЕНЮ /}
        {isMenuOpen && (
          <BurgerMenu 
            onCloseAction={closeMenu} 
            isLoggedIn={isLoggedIn} 
            navLinks={navLinks} 
          />
        )}
      </div>
    </header>
  );
}*/
