'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import css from './Header.module.css';
// import AuthNavigation from '../AuthNavigation/AuthNavigation'; 
// import ThemeToggle from '../ThemeToggle/ThemeToggle';
// import styles from './Header.module.css';
// import logo from '@/public/favicon.svg';
// export default function Header() {
//   const currentPath = usePathname(); 

//   return (<div></div>
//     // <header className={css.header}>
//     //   <div className={css.container}>
//     //     {/* Logo */}
//     //     <Link href="/" aria-label="Home" className={css.logoLink}>
//     //       <Image
//     //         src="/logo.svg"
//     //         width={22}
//     //         height={22}
//     //         alt="logo"
//     //         aria-hidden="true"
//     //         className={css.logoIcon}
//     //       />
//     //       <span className={css.logoText}>Подорожники</span>
//     //     </Link>

//     //     {/* Desktop навігація*/}
//     //     <nav aria-label="Main navigation" className={css.desktopNav}>
//     //       <ul className={css.navigation}>
//     //         <li>
//     //           <Link
//     //             href="/"
//     //             className={css.navigationLink}
//     //           >
//     //             Головна
//     //           </Link>
//     //         </li>
//     //         <li>
//     //           <Link
//     //             href="/stories"
//     //             className={css.navigationLink}
//     //           >
//     //             Історії
//     //           </Link>
//     //         </li>
//     //         <li>
//     //           <Link
//     //             href="/travellers"
//     //             className={css.navigationLink}
//     //           >
//     //             Мандрівники
//     //           </Link>
//     //         </li>
//     //       </ul>
//     //       <AuthNavigation mode="desktop" />
//     //     </nav>

//     //     {/* Tablet: кнопка “Опублікувати історію” */}
//     //     <div className={css.tabletActions}>
//     //       <Link href="/stories/create" className={css.publishButton}>
//     //         Опублікувати історію
//     //       </Link>
//     //     </div>
//     //   </div>
//     // </header>
//   );
// }
// ----------------------

'use client';

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
        {/* Логотип */}
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
          {/* Навігація */}
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
            {/* Перемикач теми */}
            <ThemeToggle />

            {!isLoggedIn ? (
              <>
                {/* Кнопка Увійти - використовуємо класи з нашого buttons.css */}
                <button className={`btn btn--header ${isHome ? 'btn--ghost-white' : 'btn--ghost'}`}>
                  Увійти
                </button>
                
                {/* Кнопка Реєстрація */}
                <button className="btn btn--header btn-primary">
                  Реєстрація
                </button>
              </>
            ) : (
              <div className={styles.profile}>
                {/* Тут буде аватар */}
              </div>
            )}
            
            {/* Кнопка Бургер (мобільне меню) */}
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
}





