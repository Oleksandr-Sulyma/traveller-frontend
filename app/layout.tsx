import type { Metadata } from 'next';

import 'modern-normalize/modern-normalize.css';

import '@/styles/variables.css';
import '@/styles/base.css';
import '@/styles/layout.css';
import '@/styles/typography.css';

/* components */
import '@/styles/components/buttons.css';
import '@/styles/components/forms.css';
import '@/styles/components/links.css';
import '@/styles/components/cards.css';

import './fonts.css';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import FooterWrapper from '@/components/Footer/FooterWrapper';

export const metadata: Metadata = {
  title: 'Подорожники',
  description: 'Мандрівки вашої мрії',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <FooterWrapper hideOn={['/auth/register', '/auth/login']} />{' '}
        {/* Приховуємо футер на сторінках реєстрації та входу */}
      </body>
    </html>
  );
}
