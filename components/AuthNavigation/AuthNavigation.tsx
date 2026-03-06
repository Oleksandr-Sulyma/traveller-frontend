
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe, logout } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import css from './AuthNavigation.module.css';
import { User } from '@/types/user';

type AuthNavigationProps = {
  mode?: 'desktop' | 'modal' | 'tablet'; 
  onCloseAction?: () => void;
};

export default function AuthNavigation({ mode = 'desktop', onCloseAction }: AuthNavigationProps) {
  const router = useRouter();
  const { isAuthenticated, user, setUser, clearIsAuthenticated } = useAuthStore();

  const { data } = useQuery<User, Error>({
    queryKey: ['me'],
    queryFn: getMe as () => Promise<User>,
    enabled: isAuthenticated && !user,
    staleTime: 1000 * 60 * 5,
  });

  if (data && !user) setUser(data);
  const currentUser = user || data;

  const handleLogout = async () => {
    try { await logout(); } catch { }
    clearIsAuthenticated();
    onCloseAction?.();
    router.push('/');
  };

  if (isAuthenticated && currentUser) {

   
    if (mode === 'tablet') {
      return (
        <div className={css.tabletCreateStoryOnly}>
          <Link
            href="/stories/create"
            className={`${css.createStoryButton} ${css.createStoryButtonDesktop}`}
            onClick={onCloseAction}
          >
            Опублікувати історію
          </Link>
        </div>
      );
    }

 
    return (
      <div className={`${css.desktopAuth} ${css.userAuthContainer}`}>
        <Link
          href="/stories/create"
          className={`${css.createStoryButton} ${css.createStoryButtonDesktop}`}
          onClick={onCloseAction}
        >
          Опублікувати історію
        </Link>

        <div className={`${css.avatarPlaceholder} ${css.avatarAdaptive}`}>
          {currentUser.name?.charAt(0).toUpperCase() || 'І'}
        </div>

        <span className={`${css.userName} ${css.userNameAdaptive}`}>
          {currentUser.name ?? 'Імʼя'}
        </span>

        <span className={`${css.separator} ${css.separatorAdaptive}`}>|</span>

        <button 
          className={`${css.logoutButton} ${css.logoutButtonAdaptive}`} 
          onClick={handleLogout} 
          aria-label="Вийти з акаунту"
        >
          <svg className={`${css.iconLogout} ${css.iconLogoutAdaptive}`} width="28" height="28" viewBox="0 0 24 24">
            <use href="/sprites/sprite.svg#icon-logout" />
          </svg>
        </button>
      </div>
    );
  }


  if (mode === 'modal') {
    return (
      <div className={css.modalAuth}>
        <Link href="/sign-in" className={css.modalLogin} onClick={onCloseAction}>
          Вхід
        </Link>
        <Link href="/sign-up" className={css.modalRegister} onClick={onCloseAction}>
          Реєстрація
        </Link>
      </div>
    );
  }

  return (
    <div className={css.desktopAuth}>
      <Link href="/sign-in" className={`${css.loginButton} ${css.authButton}`}>
        Вхід
      </Link>
      <Link href="/sign-up" className={`${css.registerButton} ${css.authButton}`}>
        Реєстрація
      </Link>
    </div>
  );
}

/*// AuthNavigation.tsx - повний код
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe, logout } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import css from './AuthNavigation.module.css';
import { User } from '@/types/user';

type AuthNavigationProps = {
  mode?: 'desktop' | 'modal';
  onCloseAction?: () => void;
};

export default function AuthNavigation({ mode = 'desktop', onCloseAction }: AuthNavigationProps) {
  const router = useRouter();
  const { isAuthenticated, user, setUser, clearIsAuthenticated } = useAuthStore();

  const { data } = useQuery<User, Error>({
    queryKey: ['me'],
    queryFn: getMe as () => Promise<User>,
    enabled: isAuthenticated && !user,
    staleTime: 1000 * 60 * 5,
  });

  if (data && !user) setUser(data);
  const currentUser = user || data;

  const handleLogout = async () => {
    try { await logout(); } catch { }
    clearIsAuthenticated();
    onCloseAction?.();
    router.push('/');
  };

 
  if (isAuthenticated && currentUser) {
    const userName = currentUser.name ?? 'Імʼя';
    const avatarLetter = userName.charAt(0).toUpperCase();

    return (
      <div className={`${css.desktopAuth} ${css.userAuthContainer}`}>
        <Link
          href="/create-story"
          className={`${css.createStoryButton} ${css.createStoryButtonDesktop}`}
          onClick={onCloseAction}
        >
          Опублікувати історію
        </Link>

        <div className={`${css.avatarPlaceholder} ${css.avatarAdaptive}`}>
          {avatarLetter}
        </div>

        <span className={`${css.userName} ${css.userNameAdaptive}`}>{userName}</span>

        <span className={`${css.separator} ${css.separatorAdaptive}`}>|</span>

        <button 
          className={`${css.logoutButton} ${css.logoutButtonAdaptive}`} 
          onClick={handleLogout} 
          aria-label="Вийти з акаунту"
        >
          <svg className={`${css.iconLogout} ${css.iconLogoutAdaptive}`} width="28" height="28" viewBox="0 0 24 24">
            <use href="/sprites/sprite.svg#icon-logout" />
          </svg>
        </button>
      </div>
    );
  }

  if (mode === 'modal') {
    return (
      <div className={css.modalAuth}>
        <Link href="/sign-in" className={css.modalLogin} onClick={onCloseAction}>
          Вхід
        </Link>
        <Link href="/sign-up" className={css.modalRegister} onClick={onCloseAction}>
          Реєстрація
        </Link>
      </div>
    );
  }


  return (
    <div className={css.desktopAuth}>
      <Link href="/sign-in" className={`${css.loginButton} ${css.authButton}`}>
        Вхід
      </Link>
      <Link href="/sign-up" className={`${css.registerButton} ${css.authButton}`}>
        Реєстрація
      </Link>
    </div>
  );
}*/

