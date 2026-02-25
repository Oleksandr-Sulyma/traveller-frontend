// 'use client';

// import Link from 'next/link';
// import css from './AuthNavigation.module.css';

// type AuthNavigationProps = {
//   mode?: 'desktop' | 'modal';
//   onCloseAction?: () => void;
// };

// export default function AuthNavigation({
//   mode = 'desktop',
//   onCloseAction,
// }: AuthNavigationProps) {
//   const handleClick = () => {
//     if (onCloseAction) onCloseAction();
//   };

//   if (mode === 'modal') {
//     return (
//       <div className={css.modalAuth}>
//         <Link
//           href="/auth/login"
//           className={css.modalLogin}
//           onClick={handleClick}
//           aria-label="Увійти в акаунт"
//         >
//           Вхід
//         </Link>
//         <Link
//           href="/auth/register"
//           className={css.modalRegister}
//           onClick={handleClick}
//           aria-label="Зареєструватися"
//         >
//           Реєстрація
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className={css.desktopAuth}>
//       <Link 
//         href="/auth/login" 
//         className={`${css.loginButton} ${css.authButton}`}
//         aria-label="Увійти в акаунт"
//       >
//         Вхід
//       </Link>
//       <Link 
//         href="/auth/register" 
//         className={`${css.registerButton} ${css.authButton}`}
//         aria-label="Зареєструватися"
//       >
//         Реєстрація
//       </Link>
//     </div>
//   );
// }







/*import Link from 'next/link';
// import css from './AuthNavigation.module.css';

type AuthNavigationProps = {
  mode?: 'desktop' | 'modal';
  onCloseAction?: () => void;
};

export default function AuthNavigation({
  mode = 'desktop',
  onCloseAction,
}: AuthNavigationProps) {
  const handleClick = () => {
    if (onCloseAction) onCloseAction();
  };

  if (mode === 'modal') {
    return (<div></div>
    //  <div className={css.modalAuth}>
    //    <Link
    //      href="/auth/login"
    //      className={css.modalLogin}
    //      onClick={handleClick}
    //      aria-label="Увійти в акаунт"
    //   >
    //     Вхід
    //   </Link>
    //    <Link
    //      href="/auth/register"
    //      className={css.modalRegister}
    //      onClick={handleClick}
    //      aria-label="Зареєструватися"
    //     >
    //       Реєстрація
    //     </Link>
    //   </div>
    );
  }

  // Desktop mode 
  // return (
  //   <div className={css.desktopAuth}>
  //     <Link href="/auth/login" className={css.loginButton}>
  //       Вхід
  //     </Link>
  //     <Link href="/auth/register" className={css.registerButton}>
  //       Реєстрація
  //     </Link>
  //  </div>
  // );
}
*/


'use client';

import Link from 'next/link';
import css from './AuthNavigation.module.css';

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
  const handleClick = () => {
    if (onCloseAction) onCloseAction();
  };

  // 1. СТАН: КОРИСТУВАЧ АВТОРИЗОВАНИЙ
  if (isLoggedIn) {
    return (
      <div className={mode === 'modal' ? css.modalAuth : css.desktopAuth}>
        <div className={css.userInfo}>
          <div className={css.avatarPlaceholder}>
             {/* Тут буде Image або перша літера імені */}
             М
          </div>
          <span className={css.userName}>Мандрівник</span>
        </div>
        <button 
          className={css.logoutButton} 
          onClick={handleClick}
          aria-label="Вийти з системи"
        >
          ➔
        </button>
      </div>
    );
  }

  // 2. СТАН: ГІСТЬ (МОДАЛЬНЕ МЕНЮ / БУРГЕР)
  if (mode === 'modal') {
    return (
      <div className={css.modalAuth}>
        <Link
          href="/auth/login"
          className={css.modalLogin}
          onClick={handleClick}
          aria-label="Увійти в акаунт"
        >
          Вхід
        </Link>
        <Link
          href="/auth/register"
          className={css.modalRegister}
          onClick={handleClick}
          aria-label="Зареєструватися"
        >
          Реєстрація
        </Link>
      </div>
    );
  }

  // 3. СТАН: ГІСТЬ (ДЕКСTOP ХЕДЕР)
  return (
    <div className={css.desktopAuth}>
      <Link 
        href="/auth/login" 
        className={`${css.loginButton} ${css.authButton}`}
        aria-label="Увійти в акаунт"
      >
        Вхід
      </Link>
      <Link 
        href="/auth/register" 
        className={`${css.registerButton} ${css.authButton}`}
        aria-label="Зареєструватися"
      >
        Реєстрація
      </Link>
    </div>
  );
}