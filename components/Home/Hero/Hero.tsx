import { title } from 'process';
import styles from './Hero.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {

  return (
    
    <section className={styles.heroContainer}>
      <picture>
        <source
          media="(min-width: 1440px)"
          srcSet="/images/hero/desktop@1x.webp 1x, /images/hero/desktop@2x.webp 2x"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/images/hero/tablet@1x.webp 1x, /images/hero/tablet@2x.webp 2x"
        />
        <Image
          src="/images/hero/mobile@1x.webp"
          alt="Traveler Background"
          fill
          priority
          quality={85}
          className={styles['hero-image']}
        />
      </picture>
      <div className={`container ${styles.container}`}>
       
       <h1 className={`hero-title ${styles['hero-title']}`}>
        Відкрийте світ подорожей з нами!
        </h1>
        <p  className={`hero-text ${styles['hero-text']}`}>
          Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися своїми історіями та отримувати натхнення для нових пригод. Відкрийте для себе нові місця та знайдіть однодумців!
          </p>
        
        <Link href="/sign-up" className="btn btn--hero">
          Доєднатись
        </Link>
      </div>
    </section>
  );
}