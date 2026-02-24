'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function HeaderWrapper() {
  const pathname = usePathname();
  
  // Перевіряємо, чи ми на головній сторінці
  const isHome = pathname === '/';

  return <Header isHome={isHome} />;
}