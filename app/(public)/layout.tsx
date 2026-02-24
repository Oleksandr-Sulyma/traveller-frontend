import { BASE_URL, SITE_DESCRIPTION, SITE_NAME, SITE_SMAL_DESCRIPTION } from '@/lib/constants/seo';
import { Metadata } from 'next';
import React from 'react';

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
            url: '../../public/images/title-bg.png',
            width: 1200,
            height: 630,
            alt: SITE_NAME,
          },
        ],
        type: 'website',
      },
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}