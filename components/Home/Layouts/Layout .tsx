import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Head from 'next/head';

const Layout = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) => {
  return (
    <>
      <Head>
        <title>{title ? title : 'Traveller App'}</title>
        <meta
          name="description"
          content={description ? description : 'Traveller frontend application'}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="FullStack developers" />
        <meta property="og:title" content={title ? title : 'Traveller App'} />
        <meta
          property="og:description"
          content={description ? description : 'Traveller frontend application'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://img.tsn.ua/cached/853/tsn-15890496c3fba55a55e21f0ca3090d06/thumbs/1200x630/04/c6/e62676060bbb0834d06c603357e5c604.jpeg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Travelers" />
      </Head>

      <div className="container">
        <header>
          <Header />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
