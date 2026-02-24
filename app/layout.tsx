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
// import Footer from '@/components/Footer/Footer';
import FooterWrapper from '@/components/Footer/FooterWrapper';
import { BASE_URL, SITE_DESCRIPTION, SITE_NAME, SITE_SMAL_DESCRIPTION } from '@/lib/constants/seo';

export const metadata: Metadata = {
  title: SITE_SMAL_DESCRIPTION,
  description: SITE_DESCRIPTION,
  openGraph: {
        title: SITE_SMAL_DESCRIPTION,
        description: SITE_DESCRIPTION,
        url: BASE_URL,
        siteName: SITE_SMAL_DESCRIPTION,
        images: [
          {
            url: '../public/images/title-bg.png',
            width: 1200,
            height: 630,
            alt: SITE_NAME,
          },
        ],
        type: 'website',
      },
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
