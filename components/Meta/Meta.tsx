'use client';

import Head from 'next/head';

interface MetaProps {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export default function Meta({
  title,
  description = 'Traveller App',
  keywords = ['traveller', 'profile', 'frontend'],
  image = '/default-og.png',
  url = '/public/images/placeholder.webp',
}: MetaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
    </Head>
  );
}
