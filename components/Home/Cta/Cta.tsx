import styles from './Cta.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Cta() {
  return (
    <section className={`container ${styles.box}`}>
      <div className={styles.wrapper}>
 <picture className={styles.image}>
        <source
          media="(min-width: 1440px)"
          srcSet="/images/cta/desktop@1x.webp 1x, /images/cta/desktop@2x.webp 2x"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/images/cta/tablet@1x.webp 1x, /images/cta/tablet@2x.webp 2x"
        />
        <Image
          src="/images/cta/mobile@1x.webp"
          alt="CTA image"
          fill
          priority
          quality={75}
          className={styles['cta-image']}
        />
      </picture>
      <div className={styles.content}>
      
        <h3 className= {`section-title-light ${styles.title}`}>Приєднуйтесь до нашої спільноти</h3>
        <p className={styles.text}>Долучайтеся до мандрівників, які діляться своїми історіями та надихають на нові пригоди.</p>
        <Link href="/sign-up" className={`btn btn-primary ${styles.cta_btn}`}>
          Зареєструватися
        </Link>
      </div>
      </div>
       
      
    </section>
  );
}