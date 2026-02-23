'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation'; 

export default function Header() {
  const currentPath = usePathname(); 

  return (<div></div>
    // <header className={css.header}>
    //   <div className={css.container}>
    //     {/* Logo */}
    //     <Link href="/" aria-label="Home" className={css.logoLink}>
    //       <Image
    //         src="/logo.svg"
    //         width={22}
    //         height={22}
    //         alt="logo"
    //         aria-hidden="true"
    //         className={css.logoIcon}
    //       />
    //       <span className={css.logoText}>Подорожники</span>
    //     </Link>

    //     {/* Desktop навігація*/}
    //     <nav aria-label="Main navigation" className={css.desktopNav}>
    //       <ul className={css.navigation}>
    //         <li>
    //           <Link
    //             href="/"
    //             className={css.navigationLink}
    //           >
    //             Головна
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             href="/stories"
    //             className={css.navigationLink}
    //           >
    //             Історії
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             href="/travellers"
    //             className={css.navigationLink}
    //           >
    //             Мандрівники
    //           </Link>
    //         </li>
    //       </ul>
    //       <AuthNavigation mode="desktop" />
    //     </nav>

    //     {/* Tablet: кнопка “Опублікувати історію” */}
    //     <div className={css.tabletActions}>
    //       <Link href="/stories/create" className={css.publishButton}>
    //         Опублікувати історію
    //       </Link>
    //     </div>
    //   </div>
    // </header>
  );
}
