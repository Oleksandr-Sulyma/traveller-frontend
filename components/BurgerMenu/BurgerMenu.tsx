'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { FC, MouseEvent } from 'react';
import css from './BurgerMenu.module.css';
import logo from '@/public/favicon.svg';

interface BurgerMenuProps {
  onCloseAction: () => void;
  isLoggedIn: boolean;
  user?: { name?: string };
  navLinks: { name: string; href: string }[];
}

const BurgerMenu: FC<BurgerMenuProps> = ({
  onCloseAction,
  isLoggedIn,
  user,
  navLinks,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

 
  const logout = useAuthStore(state => state.logout);

  
  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleLogout = () => {
    logout();                              
    queryClient.removeQueries({ queryKey: ['me'] });
    onCloseAction();                        
    router.push('/');                      
  };

  
  const userName = user?.name ?? 'Мандрівник';
  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <div className={css.overlay} onClick={onCloseAction}>
      <div className={css.modal} onClick={handleModalClick}>
       
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

          {isLoggedIn ? (
            <div className={css.headerRight}>
              <div className={css.avatarPlaceholder}>{avatarLetter}</div>
              <span className={css.userName}>
                {userName} <span className={css.separator}>|</span>
              </span>
              <button
                className={css.logoutButton}
                onClick={handleLogout}
                aria-label="Вийти з акаунту"
                title="Вийти"
              >
                <svg
                  className={css.iconLogout}
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <use href="/sprites/sprite.svg#icon-logout" />
                </svg>
              </button>
              <button
                type="button"
                className={css.closeButton}
                onClick={onCloseAction}
                aria-label="Закрити меню"
              >
                <span className={css.closeCross}>×</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={css.closeButton}
              onClick={onCloseAction}
              aria-label="Закрити меню"
            >
              <span className={css.closeCross}>×</span>
            </button>
          )}
        </div>

        {/* === НАВІГАЦІЯ === */}
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

       
        {!isLoggedIn && (
          <div className={css.modalAuthWrapper}>
            <Link href="/sign-in" className={css.modalLogin} onClick={onCloseAction}>
              Вхід
            </Link>
            <Link href="/sign-up" className={css.modalRegister} onClick={onCloseAction}>
              Реєстрація
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
