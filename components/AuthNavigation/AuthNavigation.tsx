'use client';

import Link from 'next/link';
import css from './AuthNavigation.module.css';
import { logout, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type AuthNavigationProps = {
 mode?: 'desktop' | 'modal';
 onCloseAction?: () => void;
 isLoggedIn?: boolean;
};

export default function AuthNavigation({
 mode = 'desktop',
 onCloseAction,
 isLoggedIn = false,
}: AuthNavigationProps) {
 const clearIsAuthenticated = useAuthStore(
 (state) => state.clearIsAuthenticated
 );

 const queryClient = useQueryClient();
 const router = useRouter();

 const { data: user } = useQuery({
 queryKey: ['me'],
 queryFn: getMe,
 enabled: isLoggedIn,
 staleTime: 1000 * 60 * 5,
 });

 const handleLogout = async () => {
 try {
 await logout();
 } catch (err) {
 console.error('Logout error:', err);
 }

 clearIsAuthenticated();
 queryClient.removeQueries({ queryKey: ['me'] });
 onCloseAction?.();
 router.push('/');
 };

 if (isLoggedIn) {
 const userName = user?.name ?? 'Ім`я';
 const avatarLetter = userName.charAt(0).toUpperCase();

 
 const isOnWhiteBackground =
 document.body.classList.contains('isScrolled') ||
 !document.body.classList.contains('isHome');

 const colorClass = isOnWhiteBackground ? 'darkText' : '';

 return (
 <div className={mode === 'modal' ? css.modalAuth : css.desktopAuth}>
 {/* Кнопка "Опублікувати історію" */}
 <Link
 href="/create-story"
 className={`${css.createStoryButton} ${css.authButton} ${colorClass}`}
 onClick={onCloseAction}
 >
 Опублікувати історію
 </Link>


 <div className={`${css.avatarPlaceholder} ${colorClass}`}>
 {avatarLetter}
 </div>


 <span className={`${css.userName} ${colorClass}`}>
 {userName}
 </span>

 
 <span className={`${css.separator} ${colorClass}`}>|</span>

 {/* Logout */}
 <button
 className={`${css.logoutButton} ${colorClass}`}
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
 </div>
 );
 }

 if (mode === 'modal') {
 return (
 <div className={css.modalAuth}>
 <Link
 href="/sign-in"
 className={css.modalLogin}
 onClick={onCloseAction}
 >
 Вхід
 </Link>

 <Link
 href="/sign-up"
 className={css.modalRegister}
 onClick={onCloseAction}
 >
 Реєстрація
 </Link>
 </div>
 );
 }

 return (
 <div className={css.desktopAuth}>
 <Link
 href="/sign-in"
 className={`${css.loginButton} ${css.authButton}`}
 >
 Вхід
 </Link>

 <Link
 href="/sign-up"
 className={`${css.registerButton} ${css.authButton}`}
 >
 Реєстрація
 </Link>
 </div>
 );
}
