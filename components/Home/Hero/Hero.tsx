import styles from './Hero.module.css';
import Image from 'next/image';
import Link from 'next/link'; // Додай цей імпорт!

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <picture className={styles.picture}>
        <source
          media="(min-width: 1440px)"
          srcSet="/images/hero/desktop@1x.webp 1x, /images/hero/desktop@2x.webp 2x, /images/hero/desktop@3x.webp 3x"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/images/hero/tablet@1x.webp 1x, /images/hero/tablet@2x.webp 2x, /images/hero/tablet@3x.webp 3x"
        />
        <Image
          src="/images/hero/mobile@3x.webp"
          alt="Traveler Background"
          fill
          quality={75}
          className={styles['hero-image']}
        />
      </picture>

      <div className={`container ${styles.container}`}>
        <h1 className={`hero-title ${styles['hero-title']}`}>Відкрийте світ подорожей з нами!</h1>
        <p className={`hero-text ${styles['hero-text']}`}>
          Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися своїми історіями та
          отримувати натхнення для нових пригод. Відкрийте для себе нові місця та знайдіть
          однодумців!
        </p>

        {/* Використовуємо Link для плавної навігації */}
        <Link href="#join" className="btn btn--hero">
          Доєднатись
        </Link>
      </div>
    </section>
  );
}