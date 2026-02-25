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
}

const BurgerMenu: FC<BurgerMenuProps> = ({ onCloseAction }) => {
  const pathname = usePathname();

  const handleNavClick = () => onCloseAction();
  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={css.overlay} onClick={onCloseAction}>
      <div className={css.modal} onClick={handleModalClick}>
        <div className={css.modalHeader}>
          <div className={css.logoModal}>
            <Image
              src={logo}  
              width={22}
              height={22}
              alt=""
              aria-hidden="true"
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

        <nav className={css.modalNav}>
          <ul className={css.navigation}>
            <li>
              <Link
                href="/"
                className={`${css.navigationLink} ${pathname === '/' ? css.active : ''}`}
                onClick={handleNavClick}
              >
                Головна
              </Link>
            </li>
            <li>
              <Link
                href="/stories"
                className={`${css.navigationLink} ${pathname === '/stories' ? css.active : ''}`}
                onClick={handleNavClick}
              >
                Історії
              </Link>
            </li>
            <li>
              <Link
                href="/travellers"
                className={`${css.navigationLink} ${pathname === '/travellers' ? css.active : ''}`}
                onClick={handleNavClick}
              >
                Мандрівники
              </Link>
            </li>
          </ul>
        </nav>

        <AuthNavigation mode="modal" onCloseAction={onCloseAction} />
      </div>
    </div>
  );
};

export default BurgerMenu;

