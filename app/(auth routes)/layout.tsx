'use client';

import css from './layout.module.css';
import AuthHeader from './components/AuthHeader/AuthHeader';
import AuthFooter from './components/AuthFooter/AuthFooter';
interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={`container ${css.auth_page}`}>
      <header>
        <AuthHeader />
      </header>
      <main className={css.auth_content}> {children}</main>
      <footer className={css.auth_footer}>
        <AuthFooter />
      </footer>
    </div>
  );
}
