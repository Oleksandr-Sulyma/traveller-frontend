import type { Metadata } from 'next';

/* Стилі (Reset та Глобальні змінні) */
import 'modern-normalize/modern-normalize.css';
import '@/styles/variables.css';
import '@/styles/base.css';
import '@/styles/layout.css';
import '@/styles/typography.css';

/* Компоненти стилів */
import '@/styles/components/buttons.css';
import '@/styles/components/forms.css';
import '@/styles/components/links.css';
import '@/styles/components/cards.css';

/* Шрифти */
import './fonts.css';

/* Контекст та Обертки */
import { ThemeProvider } from '@/components/ThemeProvider';
import HeaderWrapper from '@/components/Header/HeaderWrapper';
import FooterWrapper from '@/components/Footer/FooterWrapper';
import MainContent from '@/components/MainContent/MainContent';
import TanStackProvider from '@/components/Providers/TanStackProvider';
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
    <html lang="uk" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <TanStackProvider>
            <HeaderWrapper />
            <MainContent>{children}</MainContent>

            <FooterWrapper hideOn={['/auth/register', '/auth/login']} />
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
