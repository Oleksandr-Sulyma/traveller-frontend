


'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FC, MouseEvent } from 'react';
import css from './BurgerMenu.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import logo from '@/public/favicon.svg';

interface BurgerMenuProps {
  onCloseAction: () => void;
  isLoggedIn: boolean;
  navLinks: { name: string; href: string }[];
}

const BurgerMenu: FC<BurgerMenuProps> = ({ onCloseAction, isLoggedIn, navLinks }) => {
  const pathname = usePathname();

  // Запобігаємо закриттю меню при кліку всередині модального вікна
  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={css.overlay} onClick={onCloseAction}>
      <div className={css.modal} onClick={handleModalClick}>
        
        {/* ВЕРХНЯ ЧАСТИНА: ЛОГО ТА ХРЕСТИК */}
        <div className={css.modalHeader}>
          <div className={css.logoModal}>
            <Image
              src={logo}  
              width={22}
              height={22}
              alt="Логотип Подорожники"
              className={css.logoModalIcon}
            />
            <span className={css.logoModalText}>Подорожники</span>
          </div>

          <button
            type="button"
            className={css.closeButton}
            onClick={onCloseAction}
            aria-label="Закрити меню"
          >
            <span className={css.closeCross}>×</span>
          </button>
        </div>

        {/* НАВІГАЦІЯ: Динамічний список згідно з ТЗ */}
        <nav className={css.modalNav}>
          <ul className={css.navigation}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${css.navigationLink} ${pathname === link.href ? css.active : ''}`}
                  onClick={onCloseAction}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* АВТОРИЗАЦІЯ: Вхід/Реєстрація або Аватар+Вихід */}
        <div className={css.modalAuthWrapper}>
          <AuthNavigation 
            mode="modal" 
            onCloseAction={onCloseAction} 
            isLoggedIn={isLoggedIn} 
          />
        </div>
        
      </div>
    </div>
  );
};

export default BurgerMenu;