// 'use client';

// import { useState, useEffect } from 'react';
// import { useTheme } from 'next-themes';
// import Link from 'next/link';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import AuthNavigation from '../AuthNavigation/AuthNavigation';
// import BurgerMenu from '../BurgerMenu/BurgerMenu';
// import css from './Header.module.css';
// import logo from '@/public/favicon.svg';

// interface HeaderProps {
//   isHome?: boolean;
// }

// export default function Header({ isHome = false }: HeaderProps) {
//   const currentPath = usePathname();
//   const { theme, setTheme } = useTheme();

//   const [mounted, setMounted] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => setMounted(true), []);
//   if (!mounted) return null;

//   const toggleMenu = () => setIsMenuOpen((prev) => !prev);
//   const closeMenu = () => setIsMenuOpen(false);

//   return (
//     <header className={`${css.header} ${isHome ? css.isHome : ''}`}>
//       <div className= {`container ${css.container}`}>
//         {/* ==== ЛОГО ==== */}
//         <Link href="/" aria-label="На головну" className={css.logoLink}>
//           <Image
//             src={logo}
//             width={22}
//             height={22}
//             alt="Подорожники — головна сторінка"
//             className={css.logoIcon}
//             priority={isHome}
//           />
//           <span className={css.logoText}>Подорожники</span>
//         </Link>

//         {/* ==== НАВІГАЦІЯ (десктоп) ==== */}
//         <nav aria-label="Основна навігація" className={css.desktopNav}>
//           <ul className={css.navigation}>
//             <li>
//               <Link
//                 href="/"
//                 className={`${css.navigationLink} ${currentPath === '/' ? css.active : ''}`}
//               >
//                 Головна
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/stories"
//                 className={`${css.navigationLink} ${currentPath === '/stories' ? css.active : ''}`}
//               >
//                 Історії
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/travellers"
//                 className={`${css.navigationLink} ${currentPath === '/travellers' ? css.active : ''}`}
//               >
//                 Мандрівники
//               </Link>
//             </li>
//           </ul>

//           {/* ==== КНОПКИ АВТОРИЗАЦІЇ + ТЕМНА ТЕМА ==== */}
//           <div className={css.actionsGroup}>
//             <AuthNavigation mode="desktop" />
//             <button
//               type="button"
//               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//               aria-label="Перемкнути тему"
//               className={css.themeToggle}
//             >
//               {theme === 'dark' ? '🌞' : '🌙'}
//             </button>
//           </div>
//         </nav>

//         {/* ==== BurgerMenu (мобільна версія) ==== */}
//         <button
//   type="button"
//   className={css.burgerButton}
//   onClick={toggleMenu}
//   aria-label="Відкрити меню"
// >
//   {/* 3 горизонтальні риски = бургер */}
//   <div className={css.burgerLines}>
//     <span></span>
//     <span></span>
//     <span></span>
//   </div>
// </button>


//         {isMenuOpen && <BurgerMenu onCloseAction={closeMenu} />}
//       </div>
//     </header>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Стейт авторизації
  const isLoggedIn = false; 

  useEffect(() => {
    setMounted(true);

    // Функція для відстеження скролу сторінки
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Блокування скролу при відкритому бургер-меню (ТЗ)
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
      { name: 'Мій Профіль', href: '/profile' },
      { name: 'Опублікувати історію', href: '/create-story' }
    );
  }

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Динамічні класи для хедера
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
            alt="Logo" 
            priority 
          />
          <span className={css.logoText}>Подорожники</span>
        </Link>

        {/* ДЕСКТОПНА НАВІГАЦІЯ */}
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
          
          {/* ТАБЛЕТНА ВЕРСІЯ: Кнопки в хедері (768px - 1439px) */}
          <div className={css.tabletAuthVisible}>
            {!isLoggedIn ? (
              <div className={css.tabletGuestActions}>
                <Link href="/auth/login" className={css.navBtnLink}>Вхід</Link>
                <Link href="/auth/register" className={css.navBtnLink}>Реєстрація</Link>
              </div>
            ) : (
              <Link href="/create-story" className={css.navBtnLink}>Опублікувати історію</Link>
            )}
          </div>

          {/* ДЕСКТОПНА ВЕРСІЯ: AuthNavigation (1440px+) */}
          <div className={css.desktopAuthOnly}>
            <AuthNavigation mode="desktop" isLoggedIn={isLoggedIn} />
          </div>

          {/* ТЕМА */}
          <button 
            type="button"
            className={css.themeToggle} 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Змінити тему"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>

          {/* БУРГЕР */}
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

        {/* МЕНЮ НА ВЕСЬ ЕКРАН */}
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