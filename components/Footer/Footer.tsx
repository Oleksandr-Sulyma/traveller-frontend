'use client';
import Link from 'next/link';
import styles from './Footer.module.css';
import '@/styles/components/links.css';
import Image from 'next/image';
import logo from '@/public/favicon.svg';
import TravelerCard from '../TravellerCard/TravellerCard';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} style={{ background: 'var(--footer-background)' }}>
      <div className="container ">
        <div className={styles.mainRow}>
          <Link
            href="/"
            className={styles.logo + ' link-base link-text link-footer-pc link-footer-mobile'}
          >
            <Image
              src={logo}
              alt="Подорожники логотип"
              width={23}
              height={23}
              className="logoIcon"
            />
            <span>Подорожники</span>
          </Link>

          <div className={styles.social}>
            <a
              href="https://www.facebook.com/login"
              target="_blank"
              aria-label="Facebook"
              className="link-base link-icon"
            >
              <svg className={styles.icon} viewBox="0 0 32 32">
                <use href="/sprites/sprite.svg#icon-Facebook" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              aria-label="Instagram"
              className="link-base link-icon"
            >
              <svg className={styles.icon} viewBox="0 0 32 32">
                <use href="/sprites/sprite.svg#icon-Instagram" />
              </svg>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              aria-label="Twitter"
              className="link-base link-icon"
            >
              <svg className={styles.icon} viewBox="0 0 32 32">
                <use href="/sprites/sprite.svg#icon-X" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              aria-label="YouTube"
              className="link-base link-icon"
            >
              <svg className={styles.icon} viewBox="0 0 32 32">
                <use href="/sprites/sprite.svg#icon-Youtube" />
              </svg>
            </a>
          </div>

          <nav className={styles.nav}>
            <Link href="/" className="link-base link-text link-footer-pc link-footer-mobile ">
              Головна
            </Link>
            <Link
              href="/stories"
              className="link-base link-text link-footer-pc link-footer-mobile "
            >
              Історії
            </Link>
            <Link
              href="/travellers"
              className="link-base link-text link-footer-pc link-footer-mobile "
            >
              Мандрівники
            </Link>
          </nav>
        </div>

        <hr className={styles.divider} />

        <p className={styles.copyright}>© {year} Подорожники. Усі права захищені.</p>
        <TravelerCard
          photo="https://i.pinimg.com/1200x/ed/69/58/ed69588b4855a0f25680813a5f2f2671.jpg"
          name="Анастасія Олійник"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros. Сonsectetur adipiscing elit. Suspendisse varius enim in eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          buttonText="Переглянути профіль"
          onViewProfile={() => console.log('View profile clicked')}
        />
      </div>
    </footer>
  );
}
