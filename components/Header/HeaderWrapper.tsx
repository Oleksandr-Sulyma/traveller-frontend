'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

interface Props {
  hideOn: string[];
}

export default function HeaderWrapper({ hideOn }: Props) {
  const pathname = usePathname();

  // Перевіряємо, чи ми на головній сторінці
  const isHome = pathname === '/';

  if (hideOn.includes(pathname)) return null; // приховуємо тільки на точних шляхах

  return <Header isHome={isHome} />;
}
