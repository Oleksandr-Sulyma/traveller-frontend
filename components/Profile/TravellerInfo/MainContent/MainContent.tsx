'use client';

import { usePathname } from 'next/navigation';

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <main className={`main-content ${isHome ? 'is-home-layout' : ''}`}>
      {children}
    </main>
  );
}