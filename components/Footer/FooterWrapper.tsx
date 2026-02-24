'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

interface Props {
  hideOn: string[];
}

export default function FooterWrapper({ hideOn }: Props) {
  const pathname = usePathname();

  if (hideOn.includes(pathname)) return null; // приховуємо тільки на точних шляхах

  return <Footer />;
}
