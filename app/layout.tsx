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

export const metadata: Metadata = {
  title: 'Подорожники',
  description: 'Мандрівки вашої мрії',
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
