'use client';

import AuthHeader from './components/AuthHeader/AuthHeader';
import AuthFooter from './components/AuthFooter/AuthFooter';
interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container">
      {/* <AuthHeader /> */}
      {children}
      {/* <AuthFooter /> */}
    </div>
  );
}
